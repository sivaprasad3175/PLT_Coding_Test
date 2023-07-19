import axios, { AxiosResponse, AxiosRequestHeaders } from 'axios';
import type { AxiosRequestConfig } from 'axios';
const ApiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/benirvingplt/',
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json',
  },
});
type AxiosRequestType = {
  headers: AxiosRequestHeaders;
};
const requestHandler = (request: AxiosRequestType): AxiosRequestConfig => {
  return request;
};
const generalErrorMessage = {
  primary: 'Something here is not quite right',
  secondary: 'Please try again',
};
const respondHandler = (response: AxiosResponse): AxiosResponse => {
  switch (response.status) {
    case 400:
      throw new Error(generalErrorMessage as any);
    case 401:
      throw new Error(generalErrorMessage as any);
    case 403:
      throw new Error(generalErrorMessage as any);
    case 404:
      throw new Error(generalErrorMessage as any);
    case 500:
      throw new Error(generalErrorMessage as any);

    default:
      return response;
  }
};
const errorHandler = (): Promise<any> => {
  return Promise.reject(generalErrorMessage);
};
ApiClient.interceptors.request.use(
  (request: any) => requestHandler(request),
  () => errorHandler()
);

ApiClient.interceptors.response.use(
  (response) => respondHandler(response),
  () => errorHandler()
);

export default ApiClient;
