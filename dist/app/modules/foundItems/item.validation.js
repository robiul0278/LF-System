"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemValidation = void 0;
const zod_1 = require("zod");
const categorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Category name is required",
        })
    })
});
const reportFoundItemSchema = zod_1.z.object({
    body: zod_1.z.object({
        categoryId: zod_1.z.string({
            required_error: "Category ID is required",
        }).uuid("Category ID must be a valid UUID"),
        foundItemName: zod_1.z.string({
            required_error: "Found item name is required",
        }).min(1, "Found item name cannot be empty"),
        description: zod_1.z.string({
            required_error: "Description is required",
        }).min(1, "Description cannot be empty"),
        location: zod_1.z.string({
            required_error: "Location is required",
        }).min(1, "Location cannot be empty"),
    })
});
exports.itemValidation = {
    categorySchema,
    reportFoundItemSchema,
};
