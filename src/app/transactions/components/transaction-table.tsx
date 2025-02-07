import { useGetTransactions } from "@/app/transactions/api/hooks";
import { TransactionTablePagination } from "@/app/transactions/components/transaction-table-pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useModalStore } from "@/hooks/use-modal-store";
import { Pencil, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export function TransactionTable() {
  const { onOpen } = useModalStore();

  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const transactions = useGetTransactions({
    page,
    limit: 10,
  });

  if (transactions.isError) {
    return <p>Error fetching list of adjustment transactions.</p>;
  }

  if (transactions.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Table className="relative">
        <TableCaption className="text-start">
          A list of recent adjustment transactions.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.data?.data?.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell className="font-bold">{tx.sku}</TableCell>
              <TableCell>{tx.qty}</TableCell>
              <TableCell>${tx.amount}</TableCell>
              <TableCell className="flex space-x-2">
                <Button
                  size="icon"
                  variant="default"
                  onClick={() => onOpen("editTransaction", { transaction: tx })}
                >
                  <Pencil />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() =>
                    onOpen("deleteTransaction", { transaction: tx })
                  }
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TransactionTablePagination
        currentPage={page}
        totalPages={transactions.data?.meta.totalPages || 0}
      />
    </>
  );
}
