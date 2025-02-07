import { z } from "zod";

export const productFormSchema = z.object({
  title: z.string().min(1, "Title must not be empty"),
  sku: z.string().min(1, "SKU must not be empty"),
  image: z
    .string()
    .min(1, "Image must not be empty")
    .url("Image must be a valid URL"),
  price: z
    .string()
    .min(1, "Price must not be empty")
    .refine((value) => Number(value) > 0, {
      message: "Price must be a number greater than 0",
    }),
  description: z.string().optional(),
});

export type ProductFormSchema = z.infer<typeof productFormSchema>;
