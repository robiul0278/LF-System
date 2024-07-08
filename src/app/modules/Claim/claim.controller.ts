import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { claimServices } from "./claim.services";
import AppError from "../../errors/AppError";


// ============================
// Create Claim  ======
// ============================


const createClaim = catchAsync(async(req, res) => {
    
    if (!req.user || !req.user.id) {
        throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");
    }

    const userId = req?.user.id;
    const result = await claimServices.createClaim(req.body, userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Claim created successfully",
        data: result
    })
})

const getAllClaim = catchAsync(async(req, res) => {
    
    const result = await claimServices.getAllClaim();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Claims retrieved successfully",
        data: result
    })
})
const updateClaimStatus = catchAsync(async(req, res) => {

    const {claimId} = req.params;
    const result = await claimServices.updateClaimStatus(req.body, claimId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Claim updated successfully",
        data: result
    })
})

export const claimControllers = {
    createClaim,
    getAllClaim,
    updateClaimStatus,
}