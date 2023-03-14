/* eslint-disable @typescript-eslint/no-empty-function */
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImSpinner6 } from 'react-icons/im';

import { InputField } from '@/components/Auth';

import { confirmAccountApi, resetOtpApi } from '@/apis/authApi';
import { confirmPasswordSchema } from '@/schemas/auth.schema';

import { ConfirmPasswordPayload } from '@/types/Auth';

import Logo from '~/svg/logo.svg';

type Props = {
  email: string;
};

const ConfirmPassword: React.FC<Props> = ({ email }) => {
  const [counter, setCounter] = useState(60);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmPasswordPayload>({
    resolver: yupResolver(confirmPasswordSchema),
  });

  const { mutate, isLoading } = useMutation(
    (payload: ConfirmPasswordPayload) => confirmAccountApi(payload),
    {
      onSuccess: () => {},
      onError: () => {},
    }
  );

  const onSubmit = async (payload: ConfirmPasswordPayload) => {
    payload.email = email;
    delete payload.confirmPassword;
    await mutate(payload);
  };

  // The function to handle the "Resend OTP" button click
  const handleResendOTP = async () => {
    await setCounter(60);
    await resetOtpApi(email);
  };

  // The function to update the counter every second
  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  return (
    <div className='flex h-screen items-center justify-center bg-green-500 '>
      <div className='w-11/12 rounded-lg bg-white pt-5 shadow-md md:w-[450px]'>
        <div className='w-full'>
          <div className='flex w-full flex-col items-center text-center'>
            <Logo className='5xl' />
            <h3 className='pt-5 text-2xl font-bold md:text-3xl'>
              Xác minh tài khoản
            </h3>
          </div>
        </div>
        <div className='h-fit w-full rounded-lg bg-white p-8'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label='Mật khẩu mới'
              register={register}
              errors={errors}
              type='password'
              name='password'
            />
            <InputField
              label='Nhập lại mật khẩu mới'
              register={register}
              errors={errors}
              type='password'
              name='confirmPassword'
            />
            <div className='mb-3'>
              <label
                className={`${
                  errors.otp
                    ? 'mb-1 block select-none text-sm font-medium text-red-700 focus:outline-none dark:text-red-500'
                    : 'mb-1 block select-none text-sm font-medium text-black focus:outline-none'
                } after:ml-1 after:text-red-600 after:content-['*']`}
              >
                Mã OTP
              </label>
              <div className='flex'>
                <input
                  className={`${
                    errors.otp
                      ? 'font-base focus:outline:none mr-2 block w-3/5 rounded-lg border border-red-700 bg-red-50 p-2.5 text-center text-xl font-medium tracking-[10px] text-red-900 placeholder-gray-300 placeholder:font-extrabold focus-within:outline-none focus:border-red-700 focus:ring-red-500 dark:border-red-400 dark:bg-red-100'
                      : 'font-base mr-2 block w-3/5 rounded-lg border border-green-500 bg-green-50 p-2.5 text-center text-xl font-medium tracking-[10px] text-green-900 placeholder-gray-300 placeholder:font-extrabold focus-within:outline-none focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-green-400 dark:bg-green-100'
                  }`}
                  type='text'
                  placeholder='______'
                  {...register('otp')}
                />

                <div
                  onClick={() => {
                    handleResendOTP();
                  }}
                  className={`${
                    counter
                      ? ' pointer-events-none cursor-not-allowed select-none border border-gray-300 bg-white text-gray-400 hover:bg-gray-200 focus:ring-gray-500 '
                      : ' cursor-pointer bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 '
                  } w-2/5 rounded-md py-3 text-center text-base font-medium leading-6 shadow-sm focus:ring-2 focus:ring-opacity-50`}
                >
                  {counter ? `Gửi lại OTP sau ${counter}s` : 'Gửi lại OTP'}
                </div>
              </div>
              <p className='mt-2 text-sm text-red-700 dark:text-red-500'>
                <span className='font-medium'>{errors.otp?.message}</span>
              </p>
            </div>

            {isLoading ? (
              <button
                disabled
                type='button'
                className='mt-3 mb-2 inline-block w-full cursor-not-allowed rounded-md bg-green-600 py-3 px-7 text-center text-base font-medium leading-6 text-green-50 shadow-sm hover:bg-green-600 focus:ring-2 focus:ring-green-600 focus:ring-opacity-50'
              >
                <ImSpinner6 className='mr-3 inline h-5 w-5 animate-spin' />
                Xác nhận
              </button>
            ) : (
              <button
                type='submit'
                className='mt-3 mb-2 inline-block w-full rounded-md bg-green-500 py-3 px-7 text-center text-base font-medium leading-6 text-white shadow-sm hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
              >
                Xác nhận
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPassword;
