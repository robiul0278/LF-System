"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_vllidation_1 = require("./auth.vllidation");
const router = express_1.default.Router();
router.post("/login", (0, validateRequest_1.default)(auth_vllidation_1.authValidation.userLoginSchema), auth_controller_1.authControllers.loginUser);
exports.authRoutes = router;
