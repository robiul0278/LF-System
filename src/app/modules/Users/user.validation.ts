import { UserStatus } from "@prisma/client";
import { z } from "zod";

const userSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z.string({
    required_error: "Email is required",
  }),
  password: z.string({
    required_error: "Password is required",
  }),
  profile: z.object({
    bio: z.string({
      required_error: "Bio is required",
    }),
    age: z.number({
      required_error: "Age is required",
    }),
  }),
});


const updateStatus = z.object({
  body: z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.DEACTIVATE]),
  }),
});

export const userValidation = {
  userSchema,
  updateStatus,
};
