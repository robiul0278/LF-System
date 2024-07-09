const { z } = require('zod');

const userLoginSchema = z.object({
    email: z.string({
      required_error: "Email is required",
    }).email("Invalid email address"),
    password: z.string({
      required_error: "Password is required",
    }).min(6, "Password must be at least 6 characters long"),
  });
  

  export const authValidation = {
    userLoginSchema,
  };
  

  const categorySchema = z.object({
    name: z.string({
        required_error: "Category name is required",
    })
  })