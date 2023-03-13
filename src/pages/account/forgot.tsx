import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImSpinner6 } from 'react-icons/im';
import { toast } from 'react-toastify';

import { InputField } from '@/components/Auth';
import ConfirmPassword from '@/components/Auth/ConfirmPassword';

import { forgotPassword } from '@/apis/authApi';
import {
  EMAIL_NOT_EXIST,
  ERROR,
  OTP_UNSUCCESS,
} from '@/constant/message.constant';
import { emailSchema } from '@/schemas/auth.schema';

import Logo from '~/svg/logo.svg';

interface FormData {
  email: string;
}

const Forgot = () => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(emailSchema),
  });

  const { mutate, isLoading } = useMutation(
    (data: FormData) => forgotPassword(data.email),

    {
      onSuccess: async (data) => {
        switch (data.statusCode) {
          case 0:
            await setConfirm(true);
            break;
          case 1:
            toast.error(OTP_UNSUCCESS);
            break;
          case 404:
            toast.error(EMAIL_NOT_EXIST);
            break;
          default:
            toast.error(ERROR);
            break;
        }

        reset();
      },
      onError: () => {
        reset();
      },
    }
  );

  const onSubmit = async (data: FormData) => {
    await setEmail(data.email);
    await mutate(data);
  };

  if (confirm) {
    return <ConfirmPassword email={email} />;
  } else {
    return (
      <div className='flex h-screen items-center justify-center bg-green-500 '>
        <div className='w-11/12 rounded-lg bg-white pt-5 shadow-md md:w-[450px]'>
          <div className='w-full'>
            <div className='flex w-full flex-col items-center text-center'>
              <Logo className='text-5xl' />
              <h3 className='pt-5 text-2xl font-bold md:text-3xl'>
                Quên mật khẩu
              </h3>
            </div>
          </div>
          <div className='h-fit w-full rounded-lg bg-white p-8'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                label='Email'
                register={register}
                errors={errors}
                type='text'
                name='email'
              />

              {isLoading ? (
                <button
                  disabled
                  type='button'
                  className='mt-3 mb-2 inline-block w-full cursor-not-allowed rounded-md bg-green-600 py-3 px-7 text-center text-base font-medium leading-6 text-green-50 shadow-sm hover:bg-green-600 focus:ring-2 focus:ring-green-600 focus:ring-opacity-50'
                >
                  <ImSpinner6 className='mr-3 inline h-5 w-5 animate-spin' />
                  Lấy mã xác thực
                </button>
              ) : (
                <button
                  type='submit'
                  className='mt-3 mb-2 inline-block w-full rounded-md bg-green-500 py-3 px-7 text-center text-base font-medium leading-6 text-white shadow-sm hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
                >
                  Lấy mã xác thực
                </button>
              )}
            </form>
            <div className='mt-2 flex justify-center text-sm'>
              <div className='mr-2  font-medium'>Bạn nhớ mật khẩu?</div>
              <Link href='/account/login'>
                <div className='font-bold text-green-500'>Đăng nhập</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Forgot;
