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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.claimServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
// ============================
// Create Claim  ======
// ============================
const createClaim = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(payload);
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not authenticated");
    }
    const foundItem = yield prisma_1.default.foundItem.findUnique({
        where: {
            id: payload.foundItemId,
        },
    });
    if (!foundItem) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Found Item not found");
    }
    const result = yield prisma_1.default.claim.create({
        data: Object.assign(Object.assign({}, payload), { userId: user.id, foundItemId: foundItem.id }),
    });
    return result;
});
// ============================
// Get All Claim  ======
// ============================
const getAllClaim = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.claim.findMany({
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
});
// ============================
// Update Claim  ======
// ============================
const updateClaimStatus = (payload, claimId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.claim.update({
        where: {
            id: claimId,
        },
        data: {
            status: payload.status,
        },
    });
    return result;
});
exports.claimServices = {
    createClaim,
    getAllClaim,
    updateClaimStatus,
};
