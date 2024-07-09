import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import AppError from "../../errors/AppError";
import { Prisma, UserStatus } from "@prisma/client";
import { itemSearchAbleFields } from "./item.constant";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { TCategory,  TFoundItemReport } from "./item.interface";

// ============================
// Create Found Item Category  =
// ============================

const createItemCategory = async (payload: TCategory, userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
      status: UserStatus.ACTIVE,
    },
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "You are not authorized!");
  }

  const result = await prisma.foundItemCategory.create({
    data: payload,
  });
  return result;
};

// ============================
// Report Found Items  ======
// ============================

const reportFoundItem = async (payload: TFoundItemReport, userId: string) => {

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
      status: UserStatus.ACTIVE,
    },
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "You are not authorized!");
  }

  const category = await prisma.foundItemCategory.findUnique({
    where: {
      id: payload.categoryId,
    },
  });
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "Category Item not found");
  }

  const result = await prisma.foundItem.create({
    data: {
      ...payload,
      userId: user.id,
      categoryId: category.id,
    },
  });

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return {
    ...result,
    user: userData,
    category,
  };
};

// ============================
// Get Found Items   ======
// ============================

const getFoundItems = async (params: any, options: any) => {
    const {limit, page, skip} = paginationHelper.calculatePagination(options);
  const andCondition: Prisma.FoundItemWhereInput[] = [];
  const {searchTerm, ... filterData} = params;


  if (params.searchTerm) {
    andCondition.push({
      OR: itemSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        }
      })),
    });
  }

  if(Object.keys(filterData).length > 0) {
    andCondition.push({
        AND: Object.keys(filterData).map((key) => ({
            [key]: {
                equals: filterData[key],
                mode: "insensitive",
            }
        }))
    })
  }

  const whereConditions: Prisma.FoundItemWhereInput = { AND: andCondition };

  const result = await prisma.foundItem.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? {
      [options.sortBy ]: options.sortOrder
    } : {
      createdAt: 'desc'
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true
        }
      },
      category: true
    },
  });

  const total = await prisma.foundItem.count({
    where: whereConditions,
  })


  return {
   meta: {
    total,
    page,
    limit,
   },
    data: result
  };
};

export const foundItemServices = {
  createItemCategory,
  reportFoundItem,
  getFoundItems,
};
