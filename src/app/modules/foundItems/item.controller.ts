import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { foundItemServices } from "./item.services";
import AppError from "../../errors/AppError";
import pick from "../../../shared/pick";
import { itemFilterableFields } from "./item.constant";

// ============================
// Create Found Item Category   
// ============================

const createItemCategory = catchAsync(async(req, res) => {
    if (!req.user || !req.user.id) {
        throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");
    }

    const userId = req.user.id;

    const result = await foundItemServices.createItemCategory(req.body, userId)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Found item category created successfully",
        data: result
    })
})

// ============================
// Report Found Item   
// ============================

const reportFoundItem = catchAsync(async(req, res) => {

    if (!req.user || !req.user.id) {
        throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");
    }

    const userId = req.user.id;
    const result = await foundItemServices.reportFoundItem(req.body, userId);

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Found item reported successfully",
        data: result
    })
})

// ============================
// Get All Found Item   
// ============================

const getFoundItems = catchAsync(async(req, res) => {    
    const filter = pick(req.query, itemFilterableFields)
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])
    const result = await foundItemServices.getFoundItems(filter, options)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Found items retrieved successfully",
        meta: result.meta,
        data: result.data
    })
})

export const foundItemControllers = {
    createItemCategory,
    reportFoundItem,
    getFoundItems
}