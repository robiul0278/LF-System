import express from "express";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";
const router = express.Router();


router.post(
  "/register",
  validateRequest(userValidation.userRegisterSchema),
    userController.registerUser
);

router.get(
  "/my-profile",
  auth(UserRole.ADMIN, UserRole.USER),
    userController.getProfile
);
router.put(
  "/my-profile",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(userValidation.updateProfileSchema),
    userController.updateProfile
);



export const userRoutes = router;
