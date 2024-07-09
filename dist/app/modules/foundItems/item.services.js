"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foundItemServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const client_1 = require("@prisma/client");
const item_constant_1 = require("./item.constant");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
// ============================
// Create Found Item Category  =
// ============================
const createItemCategory = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You are not authorized!");
    }
    const result = yield prisma_1.default.foundItemCategory.create({
        data: payload,
    });
    return result;
});
// ============================
// Report Found Items  ======
// ============================
const reportFoundItem = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You are not authorized!");
    }
    const category = yield prisma_1.default.foundItemCategory.findUnique({
        where: {
            id: payload.categoryId,
        },
    });
    if (!category) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Category Item not found");
    }
    const result = yield prisma_1.default.foundItem.create({
        data: Object.assign(Object.assign({}, payload), { userId: user.id, categoryId: category.id }),
    });
    const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
    return Object.assign(Object.assign({}, result), { user: userData, category });
});
// ============================
// Get Found Items   ======
// ============================
const getFoundItems = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const andCondition = [];
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    if (params.searchTerm) {
        andCondition.push({
            OR: item_constant_1.itemSearchAbleFields.map((field) => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive",
                }
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andCondition.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                    mode: "insensitive",
                }
            }))
        });
    }
    const whereConditions = { AND: andCondition };
    const result = yield prisma_1.default.foundItem.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
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
    const total = yield prisma_1.default.foundItem.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result
    };
});
exports.foundItemServices = {
    createItemCategory,
    reportFoundItem,
    getFoundItems,
};
