import { useDeleteProduct } from "@/app/(products)/api/hooks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/use-modal-store";

export function DeleteProductModal() {
  const { isOpen, onClose, type, data } = useModalStore();

  const { product } = data;

  const isModalOpen = isOpen && type === "deleteProduct";

  const deleteProduct = useDeleteProduct();

  function onConfirmDelete() {
    deleteProduct.mutate(product?.sku || "");
    onClose();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Confirm Delete {`"${product?.title}"` || "Product"}?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            product from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={onConfirmDelete}>
            Yes, Delete Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
