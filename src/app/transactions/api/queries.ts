import request from "@/lib/request";

import type {
  CreateTransactionRequest,
  GetTransactionsParams,
  TransactionResponse,
} from "@/app/transactions/api/types";
import type { ApiResponse, ApiResponseWithMeta } from "@/types/shared";

const TRANSACTION_BASE_PATH = "/v1/adjustment-transactions";

export const getTransactions = (
  params: GetTransactionsParams,
): Promise<ApiResponseWithMeta<TransactionResponse[]>> => {
  return request({
    method: "GET",
    url: TRANSACTION_BASE_PATH,
    params,
  });
};

// export const getProductBySKU = (
//   sku: string,
// ): Promise<ApiResponse<ProductDetailResponse>> => {
//   return request({
//     method: "GET",
//     url: `${TRANSACTION_BASE_PATH}/${sku}`,
//   });
// };

export const createTransaction = (
  payload: CreateTransactionRequest,
): Promise<ApiResponse<TransactionResponse>> => {
  return request({
    method: "POST",
    url: TRANSACTION_BASE_PATH,
    data: payload,
  });
};

// export const updateProduct = (
//   productSKU: string,
//   payload: CreateProductRequest,
// ): Promise<ApiResponse<ProductDetailResponse>> => {
//   return request({
//     method: "PUT",
//     url: `${TRANSACTION_BASE_PATH}/${productSKU}`,
//     data: payload,
//   });
// };

export const deleteTransaction = (
  id: number,
): Promise<ApiResponse<{ message: string }>> => {
  return request({
    method: "DELETE",
    url: `${TRANSACTION_BASE_PATH}/${id}`,
  });
};
