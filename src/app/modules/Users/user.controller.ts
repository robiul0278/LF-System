import { Request, RequestHandler, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { userService } from "./user.services";
import AppError from "../../errors/AppError";


// ============================
// Register User ==============
// ============================

const registerUser = catchAsync(async (req, res) => {

    const result = await userService.registerUser(req.body);
    const {password, ... rest} = result
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User registered successfully",
      data: rest,
    });
})

// ============================
// All User ==============
// ============================

const getAllFromDB = catchAsync(async (req, res) => {

  const result = await userService.getAllUserFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Data fetched!",
    data: result,
  });
})

// ============================
// Get Profile ======
// ============================


const getProfile = catchAsync(async (req, res) => {

  if (!req.user || !req.user.id) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");
}

const userId = req?.user.id;
  const result = await userService.getProfile(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile retrieved successfully",
    data: result,
  }); 
})


// ============================
// Update Profile ======
// ============================

const updateProfile = catchAsync(async(req,res) => {

  if (!req.user || !req.user.id) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");
}
const userId = req?.user.id;

  const result = await userService.updateProfile(req.body, userId)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message:  "User profile updated successfully",
    data: result,
  });
})


export const userController = {
    registerUser,
  getAllFromDB,
  getProfile,
  updateProfile
};
