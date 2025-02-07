import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function TransactionTablePagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={currentPage === 1}
            className={cn(
              currentPage === 1 && "pointer-events-none opacity-50",
            )}
            href={
              pathname +
              "?" +
              createQueryString("page", String(currentPage - 1))
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            aria-disabled={currentPage === totalPages}
            className={cn(
              currentPage === totalPages && "pointer-events-none opacity-50",
            )}
            href={
              pathname +
              "?" +
              createQueryString("page", String(currentPage + 1))
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
