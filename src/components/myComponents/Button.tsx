import React from 'react';
import { ImSpinner6 } from 'react-icons/im';

type ButtonProps = {
  isLoading?: boolean;
  type: 'button' | 'submit' | 'reset';
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  isLoading = false,
  type,
  text,
  onClick,
  className = '',
  ...props
}) => {
  return (
    <>
      {isLoading ? (
        <button
          disabled
          type={type}
          className={`mt-3 mb-2 inline-block w-full cursor-wait rounded-md bg-primary-600 py-3 px-7 text-center font-medium leading-6 text-primary-50 shadow-sm hover:bg-primary-600 focus:ring-2 focus:ring-primary-600 focus:ring-opacity-50 ${className}`}
          {...props}
        >
          <ImSpinner6 className='mr-3 inline h-5 w-5 animate-spin' />
          {text}
        </button>
      ) : (
        <button
          type={type}
          className={`mt-3 mb-2 inline-block w-full rounded-md bg-primary-500 py-3 px-7 text-center font-medium leading-6 text-white shadow-sm hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 ${className}`}
          onClick={onClick}
          {...props}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
