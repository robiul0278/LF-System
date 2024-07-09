"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.claimValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createClaimSchema = zod_1.z.object({
    body: zod_1.z.object({
        foundItemId: zod_1.z.string({
            required_error: "Found item ID is required",
        }).uuid("Found item ID must be a valid UUID"),
        distinguishingFeatures: zod_1.z.string({
            required_error: "Distinguishing features are required",
        }).min(1, "Distinguishing features cannot be empty"),
        lostDate: zod_1.z.string({
            required_error: "Lost date is required",
        }).datetime("Lost date must be a valid date-time string"),
    })
});
const updateClaimStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([client_1.ClaimStatus.APPROVED, client_1.ClaimStatus.PENDING, client_1.ClaimStatus.REJECTED]),
    }),
});
exports.claimValidation = {
    createClaimSchema,
    updateClaimStatusSchema
};
