"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  useGetProductBySKU,
  useUpdateProduct,
} from "@/app/(products)/api/hooks";
import {
  productFormSchema,
  type ProductFormSchema,
} from "@/app/(products)/schema";
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
import { Textarea } from "@/components/ui/textarea";
import { useModalStore } from "@/hooks/use-modal-store";
import Image from "next/image";
import { useEffect } from "react";

export function ProductDetailModal() {
  const { isOpen, onClose, type, data } = useModalStore();

  const isModalOpen = isOpen && type === "detailProduct";
  const { product } = data;

  const productDetail = useGetProductBySKU(
    type === "detailProduct" ? product?.sku || "" : "",
  );

  const updateProduct = useUpdateProduct();

  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: productDetail.data?.data?.title || "",
      description: productDetail.data?.data?.description || "",
      sku: productDetail.data?.data?.sku || "",
      image: productDetail.data?.data?.image || "",
      price: productDetail.data?.data?.price.toString() || "",
    },
  });

  function onSubmit({
    title,
    description,
    image,
    sku,
    price,
  }: ProductFormSchema) {
    if (product)
      updateProduct.mutate({
        productSKU: product.sku,
        payload: {
          title,
          description,
          image,
          sku,
          price: +price,
        },
      });

    handleClose();
  }

  function handleClose() {
    form.reset();
    onClose();
  }

  useEffect(() => {
    if (productDetail.data?.data) {
      form.reset({
        title: productDetail.data.data.title,
        description: productDetail.data.data.description,
        sku: productDetail.data.data.sku,
        image: productDetail.data.data.image,
        price: productDetail.data.data.price.toString(),
      });
    }
  }, [form, productDetail.data?.data]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-screen overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Product Detail</DialogTitle>
          {product && (
            <div className="relative aspect-video">
              <Image
                priority
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          )}
          <DialogDescription />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Image URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Update Product</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
