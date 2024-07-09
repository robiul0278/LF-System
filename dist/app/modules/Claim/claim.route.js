"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.claimRoutes = void 0;
const express_1 = __importDefault(require("express"));
const claim_controller_1 = require("./claim.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const claim_validation_1 = require("./claim.validation");
const router = express_1.default.Router();
router.post('/claims', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), (0, validateRequest_1.default)(claim_validation_1.claimValidation.createClaimSchema), claim_controller_1.claimControllers.createClaim);
router.get('/claims', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), claim_controller_1.claimControllers.getAllClaim);
router.put('/claims/:claimId', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), (0, validateRequest_1.default)(claim_validation_1.claimValidation.updateClaimStatusSchema), claim_controller_1.claimControllers.updateClaimStatus);
exports.claimRoutes = router;
