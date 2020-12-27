import { AxiosRequestConfig, CancelTokenSource } from "axios";

export interface ApiInvoker {
  baseUrl?: string;
  headers?: AxiosRequestConfig;
}

export interface ApiInvokerState {
  cancelSource: CancelTokenSource | null;
}
