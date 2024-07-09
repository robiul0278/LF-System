"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userService = void 0;
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
// ============================
// User Register =======
// ============================
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield bcrypt.hash(payload.password, 12);
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // Create the user first
        const createdUser = yield transactionClient.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: hashPassword,
            },
        });
        const createdProfile = yield transactionClient.profile.create({
            data: {
                userId: createdUser.id,
                bio: payload.profile.bio,
                age: payload.profile.age,
            },
        });
        return Object.assign(Object.assign({}, createdUser), { profile: createdProfile });
    }));
    return result;
});
// ============================
// Get Profile ==============
// ============================
const getProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            profile: true,
        },
    });
    if (!(result === null || result === void 0 ? void 0 : result.profile)) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User profile not found");
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
});
// ============================
// Update Profile  ======
// ============================
const updateProfile = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
            status: client_1.UserStatus.ACTIVE,
        },
        include: { profile: true }
    });
    if (!user) {
        console.error("User not found or not active");
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not authorized!");
    }
    if (!user.profile) {
        console.error("Profile not found for user");
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User Profile not found");
    }
    const result = yield prisma_1.default.profile.update({
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
});
exports.userService = {
    registerUser,
    getProfile,
    updateProfile,
};
