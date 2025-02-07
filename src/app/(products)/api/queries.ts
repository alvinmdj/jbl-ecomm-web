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
    method: "POST",
    url: PRODUCT_BASE_PATH,
    data: payload,
  });
};

export const updateProduct = (
  productSKU: string,
  payload: CreateProductRequest,
): Promise<ApiResponse<ProductDetailResponse>> => {
  return request({
    method: "PUT",
    url: `${PRODUCT_BASE_PATH}/${productSKU}`,
    data: payload,
  });
};
