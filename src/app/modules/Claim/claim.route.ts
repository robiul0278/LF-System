import express from 'express'
import { claimControllers } from './claim.controller';
import auth from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post(
    '/claims', 
    auth(UserRole.ADMIN, UserRole.USER),
    claimControllers.createClaim
);
router.get(
    '/claims', 
    auth(UserRole.ADMIN, UserRole.USER),
    claimControllers.getAllClaim
);
router.put(
    '/claims/:claimId', 
    auth(UserRole.ADMIN, UserRole.USER),
    claimControllers.updateClaimStatus
);

export const claimRoutes = router;