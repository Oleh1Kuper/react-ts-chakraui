import axios, { AxiosRequestConfig } from 'axios';

export type FetchResponse<T> = {
  count: number;
  next: string | null;
  results: T[];
};

const axiosInstance = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: import.meta.env.VITE_API_KEY_PARAMS,
  },
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (requestConfig?: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, requestConfig)
      .then(({ data }) => data);
  };

  getSingle = (slug: string) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/${slug}`)
      .then(({ data }) => data);
  };
}

export default APIClient;
