import express from 'express'
import { claimControllers } from './claim.controller';
import auth from '../../middleware/auth';
import { UserRole } from '@prisma/client';
import validateRequest from '../../middleware/validateRequest';
import { claimValidation } from './claim.validation';

const router = express.Router();

router.post(
    '/claims', 
    auth(UserRole.ADMIN, UserRole.USER),
    validateRequest(claimValidation.createClaimSchema),
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
    validateRequest(claimValidation.updateClaimStatusSchema),
    claimControllers.updateClaimStatus
);

export const claimRoutes = router;