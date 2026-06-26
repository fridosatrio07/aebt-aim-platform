import type { TenantScope } from './types.js';

export interface ApiMeta {
  requestId: string;
  tenant?: TenantScope;
  pagination?: PaginationMeta;
  warnings?: string[];
}

export interface ApiSuccess<T> {
  data: T;
  meta: ApiMeta;
}

export interface ApiErrorDetail {
  field?: string;
  code: string;
  message: string;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details: ApiErrorDetail[];
  };
  meta: ApiMeta;
}

export interface PaginationInput {
  page?: number;
  pageSize?: number;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export function ok<T>(data: T, meta: ApiMeta): ApiSuccess<T> {
  return { data, meta };
}

export function fail(code: string, message: string, details: ApiErrorDetail[], meta: ApiMeta): ApiError {
  return { error: { code, message, details }, meta };
}

export function pagination(input: PaginationInput, totalItems: number): PaginationMeta {
  const page = Math.max(1, input.page ?? 1);
  const pageSize = Math.min(200, Math.max(1, input.pageSize ?? 25));
  return { page, pageSize, totalItems, totalPages: Math.max(1, Math.ceil(totalItems / pageSize)) };
}
