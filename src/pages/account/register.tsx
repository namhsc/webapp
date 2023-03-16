/* eslint-disable @typescript-eslint/no-empty-function */
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Active from '@/components/auth/Active';
import InputField from '@/components/auth/InputField';
import Button from '@/components/myComponents/Button';

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
      <div className='flex h-screen items-center justify-center bg-primary-50'>
        <div className='w-11/12 rounded-lg bg-white pt-5 shadow-md md:w-[450px]'>
          <div className='w-full'>
            <div className='flex w-full flex-col items-center text-center'>
              <Logo className='text-5xl' />
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
              <div className='label select-none text-sm font-medium text-black'>
                <label className=' inline-flex cursor-pointer items-center'>
                  <input
                    type='checkbox'
                    className='checked mr-2 h-4 w-4 cursor-pointer text-primary-500 focus:ring-primary-500'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  Tôi đồng ý tất cả các điều khoản
                </label>
              </div>

              <Button type='submit' isLoading={isLoading} text='Đăng ký' />
            </form>
            <div className='mt-2 flex justify-center text-sm'>
              <div className='mr-2'>Bạn đã có tài khoản?</div>
              <Link href='/account/login'>
                <div className='font-semibold text-primary-500'>Đăng nhập</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Register;
