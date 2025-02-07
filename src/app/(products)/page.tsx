"use client";

import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useGetProducts } from "@/app/(products)/api/hooks";
import type { ProductResponse } from "@/app/(products)/api/types";
import { ProductCard } from "@/app/(products)/components/product-card";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-modal-store";

export default function Home() {
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const { onOpen } = useModalStore();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    isSuccess,
  } = useGetProducts({ page: 1, limit: 8 });

  function handleViewProductDetail(product: ProductResponse) {
    onOpen("detailProduct", { product });
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <>
      <div className="flex flex-wrap justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={() => onOpen("createProduct")}>Add Product</Button>
      </div>

      {isError && <p>Error fetching products.</p>}

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading && <p>Loading...</p>}

        {isSuccess &&
          data.pages.map((page) => (
            <Fragment key={page.meta.page + 1}>
              {page.data?.map((product) => (
                <ProductCard
                  key={product.sku}
                  product={product}
                  onClickViewDetail={() => handleViewProductDetail(product)}
                />
              ))}
            </Fragment>
          ))}
      </div>

      {isSuccess && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="secondary"
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
                ? "Load Newer"
                : "Nothing more to load"}
          </Button>
        </div>
      )}
    </>
  );
}
