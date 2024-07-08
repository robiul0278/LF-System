"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config/config"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const AppError_1 = __importDefault(require("../errors/AppError"));
const auth = (...roles) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization;
            // console.log(token)
            if (!token) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
            }
            const verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.jwt_secret);
            req.user = verifiedUser;
            if (roles.length && !roles.includes(verifiedUser.role)) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Forbidden!");
            }
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.default = auth;
