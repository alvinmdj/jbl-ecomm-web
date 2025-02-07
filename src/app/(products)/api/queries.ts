import request from "@/lib/request";

import type {
  CreateProductRequest,
  ProductDetailResponse,
  ProductParams,
  ProductResponse,
} from "@/app/(products)/api/types";
import type { ApiResponse, ApiResponseWithMeta } from "@/types/shared";

const PRODUCT_BASE_PATH = "/v1/products";

export const getProducts = (
  params: ProductParams,
): Promise<ApiResponseWithMeta<ProductResponse[]>> => {
  return request({
    method: "GET",
    url: PRODUCT_BASE_PATH,
    params,
  });
};

export const getProductBySKU = (
  sku: string,
): Promise<ApiResponse<ProductDetailResponse>> => {
  return request({
    method: "GET",
    url: `${PRODUCT_BASE_PATH}/${sku}`,
  });
};

export const createProduct = (
  payload: CreateProductRequest,
): Promise<ApiResponse<ProductDetailResponse>> => {
  return request({
    method: "post",
    url: PRODUCT_BASE_PATH,
    data: payload,
  });
};

// export const updateProduct = (
//   ProductId: number,
//   payload: UpdateProductRequest,
// ): Promise<ApiResponse<ProductResponse>> => {
//   return request({
//     method: "put",
//     url: `Products/${ProductId}`,
//     data: payload,
//   });
// };
