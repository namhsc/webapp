import React, { useState } from 'react';
import { BiLock, BiUserCircle } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';

import { InputProps } from '@/types/Auth';
const InputField = ({
  label,
  register,
  errors,
  type,
  name,
  value,
  onChange,
}: InputProps) => {
  const [showPass, setShowPass] = useState<boolean>(false);

  const style = {
    color: errors[name] ? '#B91C1C' : '#22C55E',
    fontSize: '1.3em',
  };

  function InputCase(props: { name: string }) {
    switch (props.name) {
      case 'name':
        return (
          <div
            className={`absolute top-0 left-0 flex h-full w-12 items-center justify-center rounded-l-lg border border-green-500 bg-green-100 ${
              errors[name]
                ? 'border border-red-700 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-700 focus:ring-red-500 dark:border-red-400 dark:bg-red-100'
                : 'border border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100'
            }`}
          >
            <BiUserCircle style={style} />
          </div>
        );
      case 'username':
        return (
          <div
            className={`absolute top-0 left-0 flex h-full w-12 items-center justify-center rounded-l-lg border border-green-500 bg-green-100 ${
              errors[name]
                ? 'border border-red-700 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-700 focus:ring-red-500 dark:border-red-400 dark:bg-red-100'
                : 'border border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100'
            }`}
          >
            <BiUserCircle style={style} />
          </div>
        );
      case 'email':
        return (
          <div
            className={`absolute top-0 left-0 flex h-full w-12 items-center justify-center rounded-l-lg border border-green-500 bg-green-100 ${
              errors[name]
                ? 'border border-red-700 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-700 focus:ring-red-500 dark:border-red-400 dark:bg-red-100'
                : 'border border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100'
            }`}
          >
            <MdOutlineAlternateEmail style={style} />
          </div>
        );
      case 'password':
        return (
          <div
            className={`absolute top-0 left-0 flex h-full w-12 items-center justify-center rounded-l-lg border border-green-500 bg-green-100 ${
              errors[name]
                ? 'border border-red-700 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-700 focus:ring-red-500 dark:border-red-400 dark:bg-red-100'
                : 'border border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100'
            }`}
          >
            <BiLock style={style} />
          </div>
        );
      case 'confirmPassword':
        return (
          <div
            className={`absolute top-0 left-0 flex h-full w-12 items-center justify-center rounded-l-lg border border-green-500 bg-green-100 ${
              errors[name]
                ? 'border border-red-700 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-700 focus:ring-red-500 dark:border-red-400 dark:bg-red-100'
                : 'border border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100'
            }`}
          >
            <BiLock style={style} />
          </div>
        );
      default:
        return <div>Default content</div>;
    }
  }
  return (
    <div className='mb-3'>
      <label
        htmlFor={name}
        className={`mb-1 block select-none text-sm font-medium focus:outline-none ${
          errors[name] ? 'text-red-700 dark:text-red-500' : 'text-black'
        } } after:ml-1 after:text-red-600 after:content-['*']`}
      >
        {label}
      </label>
      <div className='relative'>
        <input
          type={type !== 'password' ? type : showPass ? 'text' : 'password'}
          id={name}
          value={value}
          onChange={onChange}
          className={`block w-full rounded-lg py-2.5 pr-2.5 pl-14 font-medium focus-within:outline-none focus:outline-none ${
            errors[name]
              ? ' border border-red-700 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-700 focus:ring-red-500 dark:border-red-400 dark:bg-red-100'
              : ' border border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100'
          }`}
          {...register(name)}
        />
        <InputCase name={name} />
        {type === 'password' ? (
          <div
            onClick={() => setShowPass(!showPass)}
            className='absolute top-0 right-0 flex h-11 w-11 cursor-pointer items-center justify-center rounded'
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </div>
        ) : (
          ''
        )}
      </div>
      {errors[name] && (
        <p className='mt-2 text-sm font-medium text-red-700 dark:text-red-500'>
          <span className='font-medium'>{errors[name].message}</span>
        </p>
      )}
    </div>
  );
};

export default InputField;
