import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import ConfirmPassword from '@/components/auth/ConfirmPassword';
import InputField from '@/components/auth/InputField';
import Button from '@/components/myComponents/Button';

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
      <div className='flex h-screen items-center justify-center bg-primary-50 '>
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

              <Button
                type='submit'
                isLoading={isLoading}
                text='Lấy mã xác thực'
              />
            </form>
            <div className='mt-2 flex justify-center text-sm'>
              <div className='mr-2  font-medium'>Bạn nhớ mật khẩu?</div>
              <Link href='/account/login'>
                <div className='font-bold text-primary-500'>Đăng nhập</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Forgot;
