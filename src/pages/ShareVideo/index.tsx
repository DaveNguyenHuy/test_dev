import { FC, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoviesContext } from '../../App';
import { ROUTES } from '../../utils/constants';
import { ShareVideoForm } from './ShareVideoForm';

const ShareVideo: FC = () => {
  const { currentUser } = useContext(MoviesContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate(ROUTES.home);
    }
  }, [currentUser]);

  return (
    <div className="pt-24">
      <ShareVideoForm />
    </div>
  );
};

export default ShareVideo;
