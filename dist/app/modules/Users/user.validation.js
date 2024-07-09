"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userRegisterSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }).min(6, "Password must be at least 6 characters long"),
        profile: zod_1.z.object({
            bio: zod_1.z.string({
                required_error: "Bio is required",
            }),
            age: zod_1.z.number({
                required_error: "Age is required",
            }),
        }),
    })
});
const updateProfileSchema = zod_1.z.object({
    body: zod_1.z.object({
        bio: zod_1.z.string({
            required_error: "Bio is required",
        }).min(1, "Bio cannot be empty"),
        age: zod_1.z.number({
            required_error: "Age is required",
        }).int("Age must be an integer").positive("Age must be a positive number")
    })
});
exports.userValidation = {
    userRegisterSchema,
    updateProfileSchema
};
