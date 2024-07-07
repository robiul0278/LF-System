import { UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createClaim = async (payload: any, userId: string) => {
//   console.log(payload);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
      status: UserStatus.ACTIVE,
    },
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const foundItem = await prisma.foundItem.findUnique({
    where: {
      id: payload.foundItemId,
    },
  });
  if (!foundItem) {
    throw new AppError(httpStatus.NOT_FOUND, "Found Item not found");
  }

  const result = await prisma.claim.create({
    data: {
      ...payload,
      userId: user.id,
      foundItemId: foundItem.id,
    },
  });

  return result;
};

const getAllClaim = async () => {
  const result = await prisma.claim.findMany({
    include: {
      foundItem: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          category: true,
        },
      },
    },
  });

  return result;
};

const updateClaimStatus = async (payload: any, claimId: string) => {
//   console.log(payload, claimId);
  const result = await prisma.claim.update({
    where: {
      id: claimId,
    },
    data: {
      status: payload.status,
    },
  });

  return result;
};

export const claimServices = {
  createClaim,
  getAllClaim,
  updateClaimStatus,
};
