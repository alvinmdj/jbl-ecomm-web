import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createProduct,
  getProductBySKU,
  getProducts,
  updateProduct,
} from "@/app/(products)/api/queries";
import type {
  CreateProductRequest,
  ProductParams,
} from "@/app/(products)/api/types";
import type { ApiErrorResponse } from "@/types/shared";
import { toast } from "sonner";

const keys = {
  getProducts: ["products"],
  getProductsWithParams: (params: ProductParams) => [
    ...keys.getProducts,
    params,
  ],
  getProductBySKU: (sku: string) => [...keys.getProducts, sku],
};

export function useGetProducts(params: ProductParams) {
  return useInfiniteQuery({
    queryKey: keys.getProductsWithParams(params),
    queryFn: ({ pageParam = params.page }) =>
      getProducts({ ...params, page: pageParam }),
    initialPageParam: params.page,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.meta.page + 1;
      return nextPage <= lastPage.meta.totalPages ? nextPage : undefined;
    },
  });
}

export function useGetProductBySKU(sku: string) {
  return useQuery({
    queryKey: keys.getProductBySKU(sku),
    queryFn: () => getProductBySKU(sku),
    enabled: !!sku,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onError: (error: ApiErrorResponse) => {
      toast.error(error.response?.data?.message || error.message);
    },
    onSuccess: () => {
      toast.success("Product created successfully");
      queryClient.invalidateQueries({ queryKey: keys.getProducts });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productSKU,
      payload,
    }: {
      productSKU: string;
      payload: CreateProductRequest;
    }) => updateProduct(productSKU, payload),
    onError: (error: ApiErrorResponse) => {
      toast.error(error.response?.data?.message || error.message);
    },
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: keys.getProducts });
    },
  });
}
