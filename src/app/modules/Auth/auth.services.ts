import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import AppError from "../../errors/AppError";
import { TLoginUser } from "./auth.interface";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config/config";
import bcrypt from "bcrypt";
import { UserStatus } from "@prisma/client";

// ============================
// User Login ======
// ============================

const loginUser = async (payload: TLoginUser) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password does not matched");
  }

  const jwtPayload = {
    id: user.id,
    email: user?.email,
    role: user?.role,
  };
  const accessToken = jwtHelpers.generateToken(
    jwtPayload,
    config.jwt.jwt_secret as string,
    config.jwt.jwt_expires_in as string
  );
  return {
    id: user.id,
    name: user.name,
    email: user?.email,
    token: accessToken,
  };
};

export const authServices = {
  loginUser,
};
