import { create } from "zustand";

import type { ProductResponse } from "@/app/(products)/api/types";
import type { TransactionResponse } from "@/app/transactions/api/types";

export type ModalType =
  | "createProduct"
  | "detailProduct"
  | "deleteProduct"
  | "createTransaction"
  | "editTransaction"
  | "deleteTransaction";

interface ModalData {
  product?: ProductResponse;
  transaction?: TransactionResponse;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
