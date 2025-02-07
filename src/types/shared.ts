export type MetaPaginationResponse = {
  page: number;
  limit: number;
  totalPages: number;
  totalRecords: number;
};

export type ApiResponse<T> = {
  data?: T;
};

export type ApiResponseWithMeta<T> = ApiResponse<T> & {
  meta: MetaPaginationResponse;
};
