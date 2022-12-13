import axios, {AxiosError, AxiosResponse} from 'axios';

import {API_BASE_URL} from 'config';

function ApiError(status: number, statusText: string, response: Record<string, unknown> | null) {
  this.status = status;
  this.statusText = statusText;
  this.response = response;
}

const createDefaultHeaders = () => ({});

const adjustOptions = async (options) => {
  if (!options) {
    options = {};
  }

  options.withCredentials = true;

  if (!options.headers) {
    options.headers = {};
  }
  if (typeof options.headers.then === 'function') {
    // headers as async function is also accepted
    // eslint-disable-next-line
        options.headers = await options.headers;
  }

  const headers = createDefaultHeaders();
  Object.assign(options.headers, headers);

  return options;
};

const checkStatus = (response: AxiosResponse) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new ApiError(response.status, response.statusText, response.data);
  }
};

const parseJSON = (response: AxiosResponse) => response.data || response;

const handleError = (error: AxiosError) => {
  if (error.response) {
    throw new ApiError(error.response.status, error.response.statusText, error.response.data);
  } else {
    throw error;
  }
};

const api = async (baseURL, path, options) => {
  return axios({
    ...await adjustOptions(options),
    url: baseURL + path
  })
    .then(checkStatus)
    .then(parseJSON)
    .catch(handleError);
};

// eslint-disable-next-line no-unused-vars
export const prepareApi = (baseURL: string) => (path: string, method = 'GET', data: Record<string, unknown> | null = null, headers: Record<string, string> | null = null, onUploadProgress?: (event: ProgressEvent) => void) => {
  const options = {
    method,
    data,
    headers,
    onUploadProgress
  };

  return api(baseURL, path, options);
};

export const callApi = prepareApi(API_BASE_URL);

export default api;
