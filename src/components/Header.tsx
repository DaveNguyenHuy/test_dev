import { useContext, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MoviesContext } from '../App';
import { auth } from '../utils/firebase';
import { LoginRegister } from './LoginRegister';

export const Header = () => {
  const { currentUser } = useContext(MoviesContext);
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    try {
      await auth.signOut();
      window.location.reload();
    } catch (error) {
      setLoading(false);
    }
  };

  const renderActions = () => {
    if (currentUser) {
      return (
        <>
          <span>Welcome: {currentUser.email}</span>
          <Link to="/share">
            <button className="p-1.5 border border-white rounded-sm">Share</button>
          </Link>

          <button onClick={onLogout} className="p-1.5 border border-white rounded-sm">
            {loading ? 'Loading...' : 'Logout'}
          </button>
        </>
      );
    }
    return <LoginRegister />;
  };

  return (
    <header className="h-16 flex justify-between items-center px-4 shadow-md bg-black text-white sticky top-0">
      <Link to="/">
        <div className="flex items-center space-x-2">
          <FaHome className="w-10 h-10" />
          <span className="text-xl font-bold">Funny Movies</span>
        </div>
      </Link>
      <div className="space-x-2">{renderActions()}</div>
    </header>
  );
};
