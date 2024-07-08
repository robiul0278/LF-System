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
exports.foundItemControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const item_services_1 = require("./item.services");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const item_constant_1 = require("./item.constant");
// ============================
// Create Found Item Category   
// ============================
const createItemCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user.id) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User not authenticated");
    }
    const userId = req.user.id;
    const result = yield item_services_1.foundItemServices.createItemCategory(req.body, userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Found item category created successfully",
        data: result
    });
}));
// ============================
// Report Found Item   
// ============================
const reportFoundItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user.id) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "User not authenticated");
    }
    const userId = req.user.id;
    const result = yield item_services_1.foundItemServices.reportFoundItem(req.body, userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Found item reported successfully",
        data: result
    });
}));
// ============================
// Get All Found Item   
// ============================
const getFoundItems = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.default)(req.query, item_constant_1.itemFilterableFields);
    const options = (0, pick_1.default)(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = yield item_services_1.foundItemServices.getFoundItems(filter, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Found items retrieved successfully",
        meta: result.meta,
        data: result.data
    });
}));
exports.foundItemControllers = {
    createItemCategory,
    reportFoundItem,
    getFoundItems
};
