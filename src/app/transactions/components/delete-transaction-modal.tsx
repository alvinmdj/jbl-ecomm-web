import { useDeleteTransaction } from "@/app/transactions/api/hooks";
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

export function DeleteTransactionModal() {
  const { isOpen, onClose, type, data } = useModalStore();

  const { transaction } = data;

  const isModalOpen = isOpen && type === "deleteTransaction";

  const deleteTransaction = useDeleteTransaction();

  async function onConfirmDelete() {
    try {
      await deleteTransaction.mutateAsync(transaction?.id || 0);
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Confirm Delete Transaction #{transaction?.id}?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            transaction from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={onConfirmDelete}>
            Yes, Delete Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
