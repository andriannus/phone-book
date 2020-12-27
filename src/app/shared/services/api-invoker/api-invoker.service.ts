import { reactive } from "vue";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { ApiInvoker, ApiInvokerState } from "./api-invoker.model";

import { API } from "@/app/shared/constants/api.constant";

export function useApiInvoker({ baseUrl = "", headers = {} }: ApiInvoker) {
  const state = reactive<ApiInvokerState>({
    cancelSource: null,
  });

  const apiInvoker = axios.create({
    baseURL: baseUrl || API.baseUrl,
    timeout: API.timeout,
    ...headers,
  });

  const createCancelToken = (config: AxiosRequestConfig) => {
    const { CancelToken } = axios;
    const source = CancelToken.source();
    state.cancelSource = source;

    config.cancelToken = source.token;
  };

  const cancelRequest = () => {
    if (state.cancelSource) {
      return state.cancelSource.cancel();
    }
  };

  const interceptRequest = (config: AxiosRequestConfig) => {
    cancelRequest();
    createCancelToken(config);

    return config;
  };

  const interceptSuccessResponse = (res: AxiosResponse) => {
    return res;
  };

  const interceptErrorResponse = (err: any) => {
    return Promise.reject(err);
  };

  apiInvoker.interceptors.request.use(interceptRequest);
  apiInvoker.interceptors.response.use(
    interceptSuccessResponse,
    interceptErrorResponse,
  );

  return { apiInvoker };
}
