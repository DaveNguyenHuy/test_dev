import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="h-16 flex justify-between items-center px-4 shadow-md bg-black text-white sticky top-0">
      <Link to="/">
        <div className="flex items-center space-x-2">
          <FaHome className="w-10 h-10" />
          <span className="text-xl font-bold">Funny Movies</span>
        </div>
      </Link>
      <div className="space-x-2">
        <span>Welcome someone@gmail.com</span>
        <Link to="/share">
          <span className="py-2 px-4 border border-white rounded-sm shadow-sm">Share</span>
        </Link>
        <Link to="/login">
          <span className="py-2 px-4 border border-white rounded-sm shadow-sm">Logout</span>
        </Link>
      </div>
    </header>
  );
};
