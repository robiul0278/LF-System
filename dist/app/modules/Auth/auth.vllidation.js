"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = exports.authValidation = void 0;
const { z } = require('zod');
const userLoginSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email is required",
        }).email("Invalid email address"),
        password: z.string({
            required_error: "Password is required",
        }).min(6, "Password must be at least 6 characters long"),
    })
});
exports.authValidation = {
    userLoginSchema,
};
exports.userValidationSchema = z.object({
    body: z.object({
        password: z
            .string({
            invalid_type_error: 'Password must be string',
        })
            .max(20, { message: 'Password can not be more than 20 characters' })
            .optional(),
    }),
});
