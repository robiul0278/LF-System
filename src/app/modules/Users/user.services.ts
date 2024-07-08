import { User, UserRole, UserStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TUpdateProfile, TUseRegister } from "./user.interface";


// ============================
// User Register =======
// ============================

const registerUser = async (payload: TUseRegister ) => {
  console.log(payload)
  const hashPassword: string = await bcrypt.hash(payload.password, 12);

  const result = await prisma.$transaction(async (transactionClient) => {
    // Create the user first
    const createdUser = await transactionClient.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: hashPassword,
      },
    });

    const createdProfile = await transactionClient.profile.create({
      data: {
        userId: createdUser.id,
        bio: payload.profile.bio,
        age: payload.profile.age,
      },
    });

    return {
     ...createdUser,
       profile: createdProfile,
    };
  });

  return result;
};


// ============================
// Get All User ==============
// ============================

const getAllUserFromDB = async () => {
  const result = await prisma.user.findMany();
  return result;
};


// ============================
// Get Profile ==============
// ============================

const getProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
      status: UserStatus.ACTIVE,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      profile: true,
    },
  });

  if (!result?.profile) {
    throw new AppError(httpStatus.NOT_FOUND, "User profile not found");
  }

  const userData = {
    id: result.id,
    name: result.name,
    email: result.email,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  };

  const profileData = {
    id: result.profile.id,
    userId: result.id,
    bio: result.profile.bio,
    age: result.profile.age,
    createdAt: result.profile.createdAt,
    updatedAt: result.profile.updatedAt,
    user: userData,
  };

  return profileData;
};

// ============================
// Update Profile  ======
// ============================

const updateProfile = async (payload: TUpdateProfile, userId: string) => {

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
      status: UserStatus.ACTIVE,
    },
    include: {profile: true}
  });

  if (!user) {
    console.error("User not found or not active");
    throw new AppError(httpStatus.NOT_FOUND, "User Profile not found");
  }

  if (!user.profile) {
    console.error("Profile not found for user");
    throw new AppError(httpStatus.NOT_FOUND, "User Profile not found");
  }

  const result = await prisma.profile.update({
    where: {
      id: user.profile.id,
    },
    data: payload,
  });


  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: result.updatedAt,
  };

  const profileData = {
    id: result.id,
    userId: result.userId,
    bio: result.bio,
    age: result.age,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    user: userData,
  };

  return profileData;
};


export const userService = {
  registerUser,
  getAllUserFromDB,
  getProfile,
  updateProfile,
};
