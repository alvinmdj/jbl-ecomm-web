export type TransactionResponse = {
  id: number;
  sku: string;
  qty: number;
  amount: number;
};

export type GetTransactionsParams = {
  page: number;
  limit: number;
};

export type CreateTransactionRequest = {
  sku: string;
  qty: number;
};
