import { ChangeEventHandler, useState } from 'react';

export const useInputState = (defaultValue?: string) => {
  const [value, setValue] = useState(defaultValue || '');

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange
  };
};
