"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const className = (path: string) =>
    cn("hover:underline", pathname === path && "underline");

  return (
    <nav className="flex w-full justify-center gap-4 p-4">
      <Link href="/" className={className("/")}>
        Products
      </Link>
      <Link href="/transactions" className={className("/transactions")}>
        Transactions
      </Link>
    </nav>
  );
}
