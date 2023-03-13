import {
	CONFIRM_PASSWORD_REQUIRED,
	EMAIL_NOT_VALID,
	EMAIL_REQUIRED,
	NAME_NOT_VALID,
	NAME_REQUIRED,
	OTP_NOT_VALID,
	OTP_REQUIRED,
	PASSWORD_LENGTH,
	PASSWORD_NOT_MATCH,
	PASSWORD_REQUIRED,
	USERNAME_NOT_VALID,
	USERNAME_REQUIRED,
} from '@/constant/message.constant';
import { object, string, ref } from 'yup';

export const registerSchema = object({
	name: string()
		.required(NAME_REQUIRED)
		.matches(/^[a-zA-ZÀ-ỹ]+( [a-zA-ZÀ-ỹ0-9]+){1,}$/gm, NAME_NOT_VALID),
	email: string()
		.required(EMAIL_REQUIRED)
		.matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/gm, EMAIL_NOT_VALID),
	password: string()
		.required(PASSWORD_REQUIRED)
		.min(6, PASSWORD_LENGTH)
		.max(50, PASSWORD_LENGTH),
}).required();

export const otpSchema = object({
	otp: string()
		.trim()
		.required(OTP_REQUIRED)
		.matches(/^\d{6}$/, OTP_NOT_VALID),
}).required();
// Phone: /^(03|05|07|08|09)+([0-9]{8})$/gm

export const loginSchema = object({
	username: string()
		.required(USERNAME_REQUIRED)
		.matches(
			/^(03|05|07|08|09)+([0-9]{8})$|^[a-zA-Z0-9._%+-]+@gmail.com$/gm,
			USERNAME_NOT_VALID,
		),
	password: string()
		.required(PASSWORD_REQUIRED)
		.min(6, PASSWORD_LENGTH)
		.max(50, PASSWORD_LENGTH),
}).required();

export const emailSchema = object({
	email: string()
		.required(EMAIL_REQUIRED)
		.matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/gm, EMAIL_NOT_VALID),
}).required();

export const confirmPasswordSchema = object({
	password: string()
		.required(PASSWORD_REQUIRED)
		.min(6, PASSWORD_LENGTH)
		.max(50, PASSWORD_LENGTH),
	confirmPassword: string()
		.required(CONFIRM_PASSWORD_REQUIRED)
		.oneOf([ref('password'), ''], PASSWORD_NOT_MATCH),
	otp: string()
		.trim()
		.required(OTP_REQUIRED)
		.matches(/^\d{6}$/, OTP_NOT_VALID),
}).required();
