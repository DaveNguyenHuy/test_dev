import { render, fireEvent } from '@testing-library/react';
import { Input } from '../Input';
import { LoginRegister } from '../LoginRegister';

test('test input', () => {
  const handleChange = jest.fn();
  const { getByRole } = render(
    <Input name="test" value="test" onChange={handleChange} placeholder="placeholder-test" />
  );
  const textBox = getByRole('textbox');
  expect(textBox).toBeInTheDocument();
  expect(textBox).toHaveValue('test');
  expect(textBox).toHaveAttribute('name', 'test');
  expect(textBox).toHaveAttribute('placeholder', 'placeholder-test');
});

test('test login form', () => {
  const handleChange = jest.fn();
  const { getByPlaceholderText, getByText } = render(<LoginRegister />);
  const emailTextBox = getByPlaceholderText(/email/i);
  const passWordTextBox = getByPlaceholderText(/password/i);
  const btnSubmit = getByText(/signin/i);
  expect(btnSubmit).toBeInTheDocument();
  expect(emailTextBox).toBeInTheDocument();
  expect(passWordTextBox).toBeInTheDocument();
  expect(btnSubmit).toBeEnabled();

  fireEvent.change(emailTextBox, { target: { value: 'test@gmail.com' } });
  fireEvent.change(passWordTextBox, { target: { value: 'Aa@123456' } });

  expect(emailTextBox).toHaveValue('test@gmail.com');
  expect(passWordTextBox).toHaveValue('Aa@123456');
});
