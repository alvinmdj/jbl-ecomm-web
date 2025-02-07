import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "@/app/transactions/api/queries";
import type {
  CreateTransactionRequest,
  GetTransactionsParams,
} from "@/app/transactions/api/types";
import type { ApiErrorResponse } from "@/types/shared";

const keys = {
  getTransactions: ["transactions"],
  getTransactionsWithParams: (params: GetTransactionsParams) => [
    ...keys.getTransactions,
    params,
  ],
  getTransactionByID: (id: number) => [...keys.getTransactions, id],
};

export function useGetTransactions(params: GetTransactionsParams) {
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

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: CreateTransactionRequest;
    }) => updateTransaction(id, payload),
    onError: (error: ApiErrorResponse) => {
      toast.error(error.response?.data?.message || error.message);
    },
    onSuccess: () => {
      toast.success("Transaction updated successfully");
      queryClient.invalidateQueries({ queryKey: keys.getTransactions });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTransaction(id),
    onError: (error: ApiErrorResponse) => {
      toast.error(error.response?.data?.message || error.message);
    },
    onSuccess: () => {
      toast.success("Transaction deleted successfully");
      queryClient.invalidateQueries({ queryKey: keys.getTransactions });
    },
  });
}
