import express from "express";
import { foundItemControllers } from "./item.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
    "/found-item-categories", 
    auth(UserRole.ADMIN, UserRole.USER),
    foundItemControllers.createItemCategory
);
router.post(
    "/found-items", 
    auth(UserRole.ADMIN, UserRole.USER),
    foundItemControllers.reportFoundItem
);
router.get(
    "/found-items", 
    foundItemControllers.getFoundItems
);

export const itemRoutes = router;