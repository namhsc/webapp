import Cookies from 'js-cookie';

import {
  ConfirmAccountPayload,
  ConfirmAccountResponse,
  LoginResponse,
  ResetOtpResponse,
  SendEmailResponse,
} from './../types/Auth';
import axiosClient from './axiosClient';

import { RegisterPayload, RegisterResponse } from '@/types/Auth';

export const registerApi = async (
  data: RegisterPayload
): Promise<RegisterResponse> => {
  return await axiosClient.post('/auth/register', data);
};

export const confirmAccountApi = async (
  data: ConfirmAccountPayload
): Promise<ConfirmAccountResponse> => {
  return await axiosClient.post('/auth/confirm-account', data);
};

export const resetOtpApi = async (data: string): Promise<ResetOtpResponse> => {
  return await axiosClient.post(`/auth/reset-otp?email=${data}`, data);
};
export const loginApi = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<LoginResponse> => {
  const response = await axiosClient.post('/auth/login', {
    username,
    password,
  });
  const { accessToken, refreshToken } = response.data;
  Cookies.set('accessToken', accessToken);
  Cookies.set('refreshToken', refreshToken);

  return await axiosClient.post('/auth/login', {
    username,
    password,
  });
};

// export const confirmPassword = async (
// 	password: string,
// 	token: string,
// ): Promise<void> => {
// 	await axiosClient.post('/auth/confirm-password', { password, token });
// };

export const forgotPassword = async (
  email: string
): Promise<SendEmailResponse> => {
  return await axiosClient.post(`/auth/forgot-password?email=${email}`);
};
