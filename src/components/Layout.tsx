import { FC } from 'react';
import { Header } from './Header';

export const Layout: FC = ({ children }) => {
  return (
    <div className="container mx-auto max-w-screen-2xl min-h-screen flex flex-col">
      <Header />
      <div className="p-4 bg-gray-50 flex-1">{children}</div>
    </div>
  );
};
