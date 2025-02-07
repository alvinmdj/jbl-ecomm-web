import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { ProductParams } from "@/app/(products)/api/types";
import {
  createTransaction,
  getTransactions,
} from "@/app/transactions/api/queries";
import type { GetTransactionsParams } from "@/app/transactions/api/types";
import type { ApiErrorResponse } from "@/types/shared";

const keys = {
  getTransactions: ["transactions"],
  getTransactionsWithParams: (params: GetTransactionsParams) => [
    ...keys.getTransactions,
    params,
  ],
  getTransactionByID: (id: number) => [...keys.getTransactions, id],
};

export function useGetTransactions(params: ProductParams) {
  return useQuery({
    queryKey: keys.getTransactionsWithParams(params),
    queryFn: () => getTransactions(params),
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onError: (error: ApiErrorResponse) => {
      toast.error(error.response?.data?.message || error.message);
    },
    onSuccess: () => {
      toast.success("Transaction created successfully");
      queryClient.invalidateQueries({ queryKey: keys.getTransactions });
    },
  });
}

// export function useUpdateProduct() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({
//       productSKU,
//       payload,
//     }: {
//       productSKU: string;
//       payload: CreateProductRequest;
//     }) => updateProduct(productSKU, payload),
//     onError: (error: ApiErrorResponse) => {
//       toast.error(error.response?.data?.message || error.message);
//     },
//     onSuccess: () => {
//       toast.success("Product updated successfully");
//       queryClient.invalidateQueries({ queryKey: keys.getProducts });
//     },
//   });
// }

// export function useDeleteProduct() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (sku: string) => deleteProduct(sku),
//     onError: (error: ApiErrorResponse) => {
//       toast.error(error.response?.data?.message || error.message);
//     },
//     onSuccess: () => {
//       toast.success("Product deleted successfully");
//       queryClient.invalidateQueries({ queryKey: keys.getProducts });
//     },
//   });
// }
