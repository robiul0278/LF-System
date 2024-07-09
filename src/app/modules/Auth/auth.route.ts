import express, { NextFunction, Request, Response } from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { authValidation } from "./auth.vllidation";
const router = express.Router();

router.post(
    "/login",
    validateRequest(authValidation.userLoginSchema),
    authControllers.loginUser
);

export const authRoutes = router;