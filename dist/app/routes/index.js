"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/Users/user.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const item_route_1 = require("../modules/foundItems/item.route");
const claim_route_1 = require("../modules/Claim/claim.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/",
        route: user_route_1.userRoutes,
    },
    {
        path: "/",
        route: auth_route_1.authRoutes,
    },
    {
        path: "/",
        route: item_route_1.itemRoutes,
    },
    {
        path: "/",
        route: claim_route_1.claimRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
