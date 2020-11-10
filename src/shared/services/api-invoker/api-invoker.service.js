import { reactive } from "vue";
import axios from "axios";

import { API } from "@/shared/constants/api.constant";

export const useApiInvoker = ({ baseUrl, headers } = {}) => {
  const state = reactive({
    cancelSource: null,
  });

  const apiInvoker = axios.create({
    baseURL: baseUrl || API.baseUrl,
    timeout: API.timeout,
    ...headers,
  });

  const createCancelToken = config => {
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

  const interceptRequest = config => {
    cancelRequest();
    createCancelToken(config);

    return config;
  };

  const interceptSuccessResponse = res => {
    return res;
  };

  const interceptErrorResponse = err => {
    return Promise.reject(err);
  };

  apiInvoker.interceptors.request.use(interceptRequest);
  apiInvoker.interceptors.response.use(
    interceptSuccessResponse,
    interceptErrorResponse,
  );

  return { apiInvoker };
};
