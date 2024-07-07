import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import { Secret } from "jsonwebtoken"
import config from "../../config/config"
import { jwtHelpers } from "../../helpers/jwtHelpers"
import ApiError from "../errors/AppError"

const auth = (...roles: string[]) => {
    return (req: Request & {user? : any}, res:Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization
            // console.log(token)

            if (!token) {
                throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!")
            }

            const verifiedUser = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret)

            req.user = verifiedUser;

            

            if (roles.length && !roles.includes(verifiedUser.role)) {
                throw new ApiError(httpStatus.UNAUTHORIZED, "Forbidden!")
            }

            next()
        } catch (err) {
            next(err)
        }
    }
}

export default auth;