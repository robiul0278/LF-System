import { ClaimStatus } from "@prisma/client";

export type TClaimItem = {
    foundItemId: string;
    distinguishingFeatures: string;
    lostDate: string;
}



export type TUpdateClaim =  {
    status: ClaimStatus;
}
