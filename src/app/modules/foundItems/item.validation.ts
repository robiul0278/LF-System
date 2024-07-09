import { z } from "zod";



  const categorySchema = z.object({
body: z.object({
    name: z.string({
        required_error: "Category name is required",
    })
})
  })


  const reportFoundItemSchema = z.object({
body: z.object({
    categoryId: z.string({
        required_error: "Category ID is required",
      }).uuid("Category ID must be a valid UUID"),
      foundItemName: z.string({
        required_error: "Found item name is required",
      }).min(1, "Found item name cannot be empty"),
      description: z.string({
        required_error: "Description is required",
      }).min(1, "Description cannot be empty"),
      location: z.string({
        required_error: "Location is required",
      }).min(1, "Location cannot be empty"),
})
  });



  export const itemValidation = {
    categorySchema,
    reportFoundItemSchema,
  };
  