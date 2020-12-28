export interface PaginationOptions {
  limit: number;
  page: number;
  total: number;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  prevPage: number | null;
  nextPage: number | null;
  total: number;
  totalPage: number;
}

export interface PaginatedData<T> {
  data: T[];
  meta: PaginationMeta;
}
