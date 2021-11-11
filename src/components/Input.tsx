import { ChangeEventHandler, FC } from 'react';

interface Props {
  name: string;
  placeholder: string;
  type?: string;
  value: string;
  required?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Input: FC<Props> = ({ type = 'text', ...rest }) => {
  return <input className="focus:outline-none p-1.5 rounded-sm text-black" type={type} {...rest} />;
};
