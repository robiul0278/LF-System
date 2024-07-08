"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), user_controller_1.userController.getAllFromDB);
router.post("/register", user_controller_1.userController.registerUser);
router.get("/my-profile", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), user_controller_1.userController.getProfile);
router.put("/my-profile", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), user_controller_1.userController.updateProfile);
exports.userRoutes = router;
