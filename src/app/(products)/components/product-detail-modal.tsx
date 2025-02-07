"use client";

import { useGetProductBySKU } from "@/app/(products)/api/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/use-modal-store";

export function ProductDetailModal() {
  const { isOpen, onClose, type, data } = useModalStore();

  const isModalOpen = isOpen && type === "detailProduct";
  const { product } = data;

  const productDetail = useGetProductBySKU(product?.sku || "");

  if (productDetail.isLoading) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      {/* <div className="relative aspect-video border-b"> */}
      {/* <Image
          priority
          src={productDetail.data?.data?.image || ""}
          alt={productDetail.data?.data?.title || ""}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        /> */}
      {/* </div> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
