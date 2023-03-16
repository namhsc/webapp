import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';

const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

// Add a request interceptor to add the access token to the request headers
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken: string | undefined = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response?.data;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      retryCount?: number;
    };

    if (error.response?.status === 401 && !originalRequest.retryCount) {
      // Try refreshing the access token
      originalRequest.retryCount = 1;
      try {
        const refreshToken: string | undefined = Cookies.get('refreshToken');
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/refresh-token`,
          {
            refresh_token: refreshToken,
          }
        );
        Cookies.set('accessToken', response.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return axiosClient(originalRequest);
        // Add the new access token to the request headers and retry the failed request
      } catch (error) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.replace('/login');
        // If refreshing the access token fails, redirect the user to the login page
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
