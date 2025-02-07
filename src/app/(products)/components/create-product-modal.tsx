import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCreateProduct } from "@/app/(products)/api/hooks";
import {
  productFormSchema,
  type ProductFormSchema,
} from "@/app/(products)/schema";
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
import { Textarea } from "@/components/ui/textarea";
import { useModalStore } from "@/hooks/use-modal-store";

export function CreateProductModal() {
  const { isOpen, onClose, type } = useModalStore();

  const isModalOpen = isOpen && type === "createProduct";

  const createProduct = useCreateProduct();

  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      description: "",
      sku: "",
      image: "",
      price: "",
    },
  });

  function onSubmit({
    title,
    description,
    image,
    sku,
    price,
  }: ProductFormSchema) {
    createProduct.mutate({
      title,
      description,
      image,
      sku,
      price: +price,
    });

    handleClose();
  }

  function handleClose() {
    form.reset();
    onClose();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-screen overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
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

            <Button type="submit">Add Product</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
