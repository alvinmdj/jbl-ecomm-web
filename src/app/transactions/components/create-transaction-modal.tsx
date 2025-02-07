import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCreateTransaction } from "@/app/transactions/api/hooks";
import {
  transactionFormSchema,
  type TransactionFormSchema,
} from "@/app/transactions/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModalStore } from "@/hooks/use-modal-store";

export function CreateTransactionModal() {
  const { isOpen, onClose, type } = useModalStore();

  const isModalOpen = isOpen && type === "createTransaction";

  const createTransaction = useCreateTransaction();

  const form = useForm<TransactionFormSchema>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      sku: "",
      qty: "",
    },
  });

  async function onSubmit({ sku, qty }: TransactionFormSchema) {
    try {
      await createTransaction.mutateAsync({
        sku,
        qty: +qty,
      });

      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  function handleClose() {
    form.reset();
    onClose();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-screen overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input placeholder="SKU" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="qty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="Quantity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Create Transaction</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
