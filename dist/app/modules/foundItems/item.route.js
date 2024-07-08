"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRoutes = void 0;
const express_1 = __importDefault(require("express"));
const item_controller_1 = require("./item.controller");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post("/found-item-categories", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), item_controller_1.foundItemControllers.createItemCategory);
router.post("/found-items", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), item_controller_1.foundItemControllers.reportFoundItem);
router.get("/found-items", item_controller_1.foundItemControllers.getFoundItems);
exports.itemRoutes = router;
