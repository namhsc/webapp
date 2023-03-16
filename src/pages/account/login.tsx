import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import InputField from '@/components/auth/InputField';
import Button from '@/components/myComponents/Button';

import { loginApi } from '@/apis/authApi';
import {
  EMAIL_NOT_ACTIVATE,
  LOGIN_INCORRECT,
} from '@/constant/message.constant';
import { loginSchema } from '@/schemas/auth.schema';

import { LoginPayload } from '@/types/Auth';

import Logo from '~/svg/logo.svg';

const Login = () => {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const { mutate, isLoading } = useMutation(
    (payload: LoginPayload) => loginApi(payload),

    {
      onSuccess: async (data) => {
        switch (data.statusCode) {
          case 0:
            router.push('/');
            break;
          case 5:
            toast.error(EMAIL_NOT_ACTIVATE);
            break;
          case 6:
            toast.error(LOGIN_INCORRECT);
            break;

          default:
            break;
        }
        reset();
      },
      onError: () => {
        reset();
      },
    }
  );

  const onSubmit = async (payload: LoginPayload) => {
    if (rememberMe) {
      Cookies.set('username', payload.username);
    }
    await mutate(payload);
  };
  useEffect(() => {
    const rememberUsername = Cookies.get('username');
    if (rememberUsername) {
      setValue('username', rememberUsername);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex h-screen items-center justify-center bg-primary-50 '>
      <div className='w-11/12 rounded-lg bg-white pt-5 shadow-md md:w-[450px]'>
        <div className='w-full'>
          <div className='flex w-full flex-col items-center text-center'>
            <Logo className='text-5xl' />
            <h3 className='pt-5 text-2xl font-bold md:text-3xl'>
              Đăng nhập tài khoản
            </h3>
          </div>
        </div>
        <div className='h-fit w-full rounded-lg bg-white p-8'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label='Email / Số điện thoại'
              register={register}
              errors={errors}
              type='text'
              name='username'
            />
            <InputField
              label='Mật khẩu'
              register={register}
              errors={errors}
              type='password'
              name='password'
            />
            <div className='label flex select-none justify-between text-sm font-medium text-black'>
              <label className='inline-flex cursor-pointer items-center'>
                <input
                  type='checkbox'
                  className='checked mr-2 h-4 w-4 cursor-pointer text-primary-500 focus:ring-primary-500'
                  checked={rememberMe}
                  onChange={handleRememberMe}
                />
                Ghi nhớ
              </label>
              <Link href='/account/forgot'>
                <div className='inline-flex cursor-pointer items-center font-bold text-primary-500'>
                  Quên mật khẩu
                </div>
              </Link>
            </div>

            <Button type='submit' isLoading={isLoading} text='Đăng nhập' />
          </form>

          <div className='mt-2 flex justify-center text-sm'>
            <div className='mr-2 '>Bạn chưa có tài khoản?</div>
            <Link href='/account/register'>
              <div className='font-semibold text-primary-500'>Đăng ký</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
