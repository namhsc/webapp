/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}
export interface InputProps {
  label: string;
  register: any;
  errors: any;
  type: string;
  name: string;
  value?: any;
  onChange?: any;
}
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
export interface RegisterResponse {
  statusCode: number;
  message: string;
  data: object;
}

export interface ConfirmAccountPayload {
  email: string;
  otp: string;
}

export interface ConfirmAccountResponse {
  statusCode: number;
  message?: string;
}

export interface ResetOtpResponse {
  statusCode: number;
  message?: string;
}
export interface LoginPayload {
  username: string;
  password: string;
}
export interface LoginResponse {
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface SendEmailResponse {
  statusCode: number;
  message: string;
}

export interface ConfirmPasswordPayload {
  email: string;
  otp: string;
  password: string;
  confirmPassword?: string;
}
export interface ConfirmPasswordResponse {
  statusCode: number;
  message: string;
}
