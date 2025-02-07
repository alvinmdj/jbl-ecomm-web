import Image from "next/image";

import type { ProductResponse } from "@/app/(products)/api/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProductCard({
  product,
  onClickViewDetail,
}: {
  product: ProductResponse;
  onClickViewDetail: () => void;
}) {
  return (
    <Card className="flex flex-col">
      <div className="relative aspect-video border-b">
        <Image
          priority
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>SKU: {product.sku}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <p>Price: ${product.price}</p>
        <p>Stock: {product.stock}</p>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={onClickViewDetail}
        >
          View Detail
        </Button>
      </CardFooter>
    </Card>
  );
}
