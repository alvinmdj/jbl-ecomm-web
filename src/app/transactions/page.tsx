"use client";

import { TransactionTable } from "@/app/transactions/components/transaction-table";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-modal-store";

export default function TransactionsPage() {
  const { onOpen } = useModalStore();

  return (
    <>
      <div className="flex flex-wrap justify-between">
        <h1 className="text-3xl font-bold">Adjustment Transactions</h1>
        <Button onClick={() => onOpen("createTransaction")}>
          Create Transaction
        </Button>
      </div>

      <TransactionTable />
    </>
  );
}
