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
} from "@/app/(products)/api/queries";
import type { ProductParams } from "@/app/(products)/api/types";
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
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.getProducts });
    },
  });
}

// export function useUpdateProduct() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({
//       ProductId,
//       payload,
//     }: {
//       ProductId: number;
//       payload: UpdateProductRequest;
//     }) => updateProduct(ProductId, payload),
//     onError: (error) => {
//       message.error(error.message);
//     },
//     onSuccess: () => {
//       message.success("Perubahan Berhasil Tersimpan");
//       queryClient.invalidateQueries({ queryKey: keys.getProducts });
//     },
//   });
// }
