import express from "express";
import { userRoutes } from "../modules/Users/user.route";
import { authRoutes } from "../modules/Auth/auth.route";
import { itemRoutes } from "../modules/foundItems/item.route";
import { claimRoutes } from "../modules/Claim/claim.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/",
    route: authRoutes,
  },
  {
    path: "/",
    route: itemRoutes,
  },
  {
    path: "/",
    route: claimRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;
