import express from "express";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";
const router = express.Router();

router.get('/',
auth(UserRole.ADMIN, UserRole.USER),
  userController.getAllFromDB
)

router.post(
  "/register",
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
    userController.updateProfile
);



export const userRoutes = router;
