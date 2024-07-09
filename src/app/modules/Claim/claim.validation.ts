import { ClaimStatus} from "@prisma/client";
import { z } from "zod";



const createClaimSchema = z.object({
    body: z.object({
        foundItemId: z.string({
            required_error: "Found item ID is required",
          }).uuid("Found item ID must be a valid UUID"),
          distinguishingFeatures: z.string({
            required_error: "Distinguishing features are required",
          }).min(1, "Distinguishing features cannot be empty"),
          lostDate: z.string({
            required_error: "Lost date is required",
          }).datetime("Lost date must be a valid date-time string"),
    })
  });

  const updateClaimStatusSchema = z.object({
    body: z.object({
      status: z.enum([ClaimStatus.APPROVED, ClaimStatus.PENDING, ClaimStatus.REJECTED]),
    }),
  });

  
  export const claimValidation = {
    createClaimSchema,
    updateClaimStatusSchema
  };
  