import { FormEventHandler, useState } from 'react';
import { useInputState } from '../hooks/useInputState';
import { loginRegister } from '../utils/services';
import { Input } from './Input';

export const LoginRegister = () => {
  const [loading, setLoading] = useState(false);
  const emailInput = useInputState();
  const passWordInput = useInputState();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passWordInput.value;
    setLoading(true);
    await loginRegister(email, password);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input required name="email" placeholder="Email" {...emailInput} />
      <Input required name="password" placeholder="Password" type="password" {...passWordInput} />
      <button
        disabled={loading}
        type="submit"
        className="p-1.5 border border-white rounded-sm disabled:opacity-80"
      >
        {loading ? 'Loading...' : 'Signin'}
      </button>
    </form>
  );
};
