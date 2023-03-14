/* eslint-disable @typescript-eslint/no-empty-function */
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImSpinner6 } from 'react-icons/im';
import { toast } from 'react-toastify';

import { InputField } from '@/components/Auth';
import Active from '@/components/Auth/Active';

import { registerApi } from '@/apis/authApi';
import { EMAIL_EXIST, ERROR } from '@/constant/message.constant';
import { registerSchema } from '@/schemas/auth.schema';

import { RegisterPayload } from '@/types/Auth';

import Logo from '~/svg/logo.svg';

const Register = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const handleCheckboxChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIsChecked(event.target.checked);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPayload>({
    resolver: yupResolver(registerSchema),
  });

  const { mutate, isLoading } = useMutation(
    (payload: RegisterPayload) => registerApi(payload),

    {
      onSuccess: async (data) => {
        switch (data.statusCode) {
          case 0:
            await setActive(true);
            break;
          case 2:
            toast.error(EMAIL_EXIST);
            break;
          default:
            toast.error(ERROR);
            break;
        }
      },
      onError: () => {},
    }
  );

  const onSubmit = async (payload: RegisterPayload) => {
    if (isChecked) {
      await setEmail(payload.email);
      await mutate(payload);
    }
  };

  if (active) {
    return <Active email={email} />;
  } else {
    return (
      <div className='flex h-screen items-center justify-center bg-green-500'>
        <div className='w-11/12 rounded-lg bg-white pt-5 shadow-md md:w-[450px]'>
          <div className='w-full'>
            <div className='flex w-full flex-col items-center text-center'>
              <Logo />
              <h3 className='pt-5 text-2xl font-bold md:text-3xl'>
                Đăng ký tài khoản
              </h3>
            </div>
          </div>
          <div className='h-fit w-full rounded-lg bg-white p-8'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                label='Tên người dùng'
                register={register}
                errors={errors}
                type='text'
                name='name'
              />
              <InputField
                label='Email'
                register={register}
                errors={errors}
                type='text'
                name='email'
              />
              <InputField
                label='Mật khẩu'
                register={register}
                errors={errors}
                type='password'
                name='password'
              />
              <div className='select-none text-sm font-medium text-black'>
                <label className='inline-flex cursor-pointer items-center'>
                  <input
                    type='checkbox'
                    className='mr-2 h-4 w-4 cursor-pointer accent-green-600'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  Tôi đồng ý tất cả các điều khoản
                </label>
              </div>

              {isLoading ? (
                <button
                  disabled
                  type='button'
                  className='mt-3 mb-2 inline-block w-full cursor-not-allowed rounded-md bg-green-600 py-3 px-7 text-center text-base font-medium leading-6 text-green-50 shadow-sm hover:bg-green-600 focus:ring-2 focus:ring-green-600 focus:ring-opacity-50'
                >
                  <ImSpinner6 className='mr-3 inline h-5 w-5 animate-spin' />
                  Đăng ký
                </button>
              ) : (
                <button
                  type='submit'
                  className='mt-3 mb-2 inline-block w-full rounded-md bg-green-500 py-3 px-7 text-center text-base font-medium leading-6 text-white shadow-sm hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
                >
                  Đăng ký
                </button>
              )}
            </form>
            <div className='mt-2 flex justify-center text-sm'>
              <div className='mr-2  font-medium'>Bạn đã có tài khoản?</div>
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

export default Register;
