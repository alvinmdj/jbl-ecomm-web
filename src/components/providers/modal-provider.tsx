"use client";

import { useEffect, useState } from "react";

import { CreateProductModal } from "@/app/(products)/components/create-product-modal";
import { DeleteProductModal } from "@/app/(products)/components/delete-product-modal";
import { ProductDetailModal } from "@/app/(products)/components/product-detail-modal";
import { CreateTransactionModal } from "@/app/transactions/components/create-transaction-modal";
import { DeleteTransactionModal } from "@/app/transactions/components/delete-transaction-modal";
import { EditTransactionModal } from "@/app/transactions/components/edit-transaction-modal";

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
      <CreateTransactionModal />
      <EditTransactionModal />
      <DeleteTransactionModal />
    </>
  );
};
