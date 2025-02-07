import { useGetTransactions } from "@/app/transactions/api/hooks";
import { TransactionTablePagination } from "@/app/transactions/components/transaction-table-pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSearchParams } from "next/navigation";

export function TransactionTable() {
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.data?.data?.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell className="font-medium">{tx.sku}</TableCell>
              <TableCell>{tx.qty}</TableCell>
              <TableCell>${tx.amount}</TableCell>
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
