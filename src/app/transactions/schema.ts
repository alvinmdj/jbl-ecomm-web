import { z } from "zod";

export const transactionFormSchema = z.object({
  sku: z.string().min(1, "SKU must not be empty"),
  qty: z
    .string()
    .min(1, "Quantity must not be empty")
    .refine((value) => Number(value) > 0 || Number(value) < 0, {
      message: "Quantity must not be zero",
    }),
});

export type TransactionFormSchema = z.infer<typeof transactionFormSchema>;
