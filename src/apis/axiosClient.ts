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

let accessToken: string | undefined = Cookies.get('accessToken');
let refreshToken: string | undefined = Cookies.get('refreshToken');

// Define a function to refresh the access token
const refreshAccessToken = async () => {
	try {
		const response = await axiosClient.post(
			`/auth/refresh-token?refresh-token=${refreshToken}`,
		);
		accessToken = response.data.accessToken;
		if (accessToken) Cookies.set('accessToken', accessToken); // save access token in local storage
		refreshToken = response.data.refreshToken;
		if (refreshToken) Cookies.set('refreshToken', refreshToken); // save refresh token in local storage
		return Promise.resolve();
	} catch (error) {
		return Promise.reject(error);
	}
};

// Add a request interceptor to add the access token to the request headers
axiosClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

axiosClient.interceptors.response.use(
	(response: AxiosResponse) => {
		return response?.data;
	},
	async (error: AxiosError) => {
		if (error.response?.status === 401) {
			// Try refreshing the access token
			try {
				await refreshAccessToken();
				// Add the new access token to the request headers and retry the failed request
				error.response.config.headers[
					'Authorization'
				] = `Bearer ${accessToken}`;
				return axiosClient(error.response.config);
			} catch (error) {
				// If refreshing the access token fails, redirect the user to the login page
				return Promise.reject(error);
			}
		}
		return Promise.reject(error);
	},
);

export default axiosClient;
