import { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from "axios";

export interface ApiInvokerConfig {
  baseUrl?: string;
  headers?: AxiosRequestConfig;
}

export interface ApiInvokerService {
  apiInvoker: AxiosInstance;
}

export interface ApiInvokerState {
  cancelSource: CancelTokenSource | null;
}
