export type ProductResponse = {
  title: string;
  sku: string;
  image: string;
  price: number;
  stock: number;
};

export type ProductDetailResponse = ProductResponse & {
  description: string;
};

export type ProductParams = {
  page: number;
  limit: number;
};

export type CreateProductRequest = {
  title: string;
  description?: string;
  sku: string;
  image: string;
  price: number;
};
