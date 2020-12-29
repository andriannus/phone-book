import { reactive } from "vue";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import {
  ApiInvokerConfig,
  ApiInvokerService,
  ApiInvokerState,
} from "./api-invoker.model";

import { API } from "@/app/shared/constants/api.constant";

export function useApiInvoker({
  baseUrl = "",
  headers = {},
}: ApiInvokerConfig): ApiInvokerService {
  const state = reactive<ApiInvokerState>({
    cancelSource: null,
  });

  const apiInvoker = axios.create({
    baseURL: baseUrl || API.baseUrl,
    timeout: API.timeout,
    ...headers,
  });

  function createCancelToken(config: AxiosRequestConfig): void {
    const { CancelToken } = axios;
    const source = CancelToken.source();
    state.cancelSource = source;

    config.cancelToken = source.token;
  }

  function cancelRequest(): void {
    if (state.cancelSource) {
      return state.cancelSource.cancel();
    }
  }

  function interceptRequest(config: AxiosRequestConfig): AxiosRequestConfig {
    cancelRequest();
    createCancelToken(config);

    return config;
  }

  function interceptSuccessResponse(res: AxiosResponse): AxiosResponse {
    return res;
  }

  function interceptErrorResponse(err: any): Promise<never> {
    return Promise.reject(err);
  }

  apiInvoker.interceptors.request.use(interceptRequest);
  apiInvoker.interceptors.response.use(
    interceptSuccessResponse,
    interceptErrorResponse,
  );

  return { apiInvoker };
}
