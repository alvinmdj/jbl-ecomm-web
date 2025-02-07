"use client";

import { useEffect, useState } from "react";

import { CreateProductModal } from "@/app/(products)/components/create-product-modal";
import { DeleteProductModal } from "@/app/(products)/components/delete-product-modal";
import { ProductDetailModal } from "@/app/(products)/components/product-detail-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateProductModal />
      <ProductDetailModal />
      <DeleteProductModal />
    </>
  );
};
