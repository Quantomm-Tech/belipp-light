import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { authenticationTokenPay } from "./token.service";

const onRequest = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  if (config.headers) {
    let token = "";
    token = await authenticationTokenPay();

    config.headers["Accept"] = "application/json";
    config.headers["Content-Type"] = "application/json";
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  /* console.info(`[request] [${JSON.stringify(config)}]`) */
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  /* console.error(`[request error] [${JSON.stringify(error)}]`) */
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  /* console.info(`[response] [${JSON.stringify(response)}]`) */
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  /* console.error(`[response error] [${JSON.stringify(error)}]`) */
  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
