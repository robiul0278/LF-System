import { UserStatus } from "@prisma/client";
import { z } from "zod";

const userRegisterSchema = z.object({
body: z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z.string({
    required_error: "Email is required",
  }),
  password: z.string({
    required_error: "Password is required",
  }).min(6, "Password must be at least 6 characters long"),
  profile: z.object({
    bio: z.string({
      required_error: "Bio is required",
    }),
    age: z.number({
      required_error: "Age is required",
    }),
  }),
})
});

const updateProfileSchema = z.object({
body: z.object({
  bio: z.string({
    required_error: "Bio is required",
  }).min(1, "Bio cannot be empty"),
  age: z.number({
    required_error: "Age is required",
  }).int("Age must be an integer").positive("Age must be a positive number")
})
});

export const userValidation = {
  userRegisterSchema,
  updateProfileSchema
};
