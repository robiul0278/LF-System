import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { authServices } from "./auth.services";

const loginUser = catchAsync(async (req, res) => {

    const result = await authServices.loginUser(req.body)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "User Login Successful",
        data: result
    })
})

export const authControllers = {
    loginUser,
} 