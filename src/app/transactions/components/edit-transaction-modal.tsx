"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useUpdateTransaction } from "@/app/transactions/api/hooks";
import {
  transactionFormSchema,
  type TransactionFormSchema,
} from "@/app/transactions/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useEffect } from "react";

export function EditTransactionModal() {
  const { isOpen, onClose, type, data } = useModalStore();

  const isModalOpen = isOpen && type === "editTransaction";
  const { transaction } = data;

  const updateTransaction = useUpdateTransaction();

  const form = useForm<TransactionFormSchema>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      sku: transaction?.sku || "",
      qty: transaction?.qty.toString() || "",
    },
  });

  async function onSubmit({ sku, qty }: TransactionFormSchema) {
    if (transaction)
      try {
        await updateTransaction.mutateAsync({
          id: transaction.id,
          payload: {
            sku,
            qty: +qty,
          },
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

  useEffect(() => {
    form.reset({
      sku: transaction?.sku || "",
      qty: transaction?.qty.toString() || "",
    });
  }, [form, transaction?.qty, transaction?.sku]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-screen overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Update Transaction</DialogTitle>
          <DialogDescription />
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

            <Button type="submit">Update Transaction</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
