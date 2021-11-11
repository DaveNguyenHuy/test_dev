import { FormEventHandler, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { MoviesContext } from '../../App';
import { useInputState } from '../../hooks/useInputState';
import { ROUTES } from '../../utils/constants';
import { fetchVideoInformation, shareMovie } from '../../utils/services';
import { ShareMovieDto } from '../../utils/types';

export const ShareVideoForm = () => {
  const { currentUser } = useContext(MoviesContext);
  const urlInput = useInputState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();
    if (url) {
      setLoading(true);
      const videoInformation = await fetchVideoInformation(url);
      if (!videoInformation) {
        setLoading(false);
        return alert('invalid url');
      }

      const {
        id,
        snippet: { title, description }
      } = videoInformation.items[0];
      const data: ShareMovieDto = {
        title,
        description,
        shared_by: currentUser.email,
        url: `https://www.youtube.com/embed/${id}`
      };
      try {
        await shareMovie(data);
        setLoading(false);
        navigate(ROUTES.home);
        alert('share movie success');
      } catch (error) {
        alert('share movie failed');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl bg-white border-gray-500 relative border-2 px-8 py-12 rounded-md space-y-4 flex flex-col justify-end"
    >
      <h2 className="rounded-md bg-white px-1 text-2xl absolute -top-5 left-4">
        Share a Youtube Movie
      </h2>
      <div className="w-full space-x-2 flex">
        <label className="text-lg mt-1">Youtube URL:</label>
        <div className="space-y-6 flex-1">
          <input
            name="url"
            required
            {...urlInput}
            placeholder="youtube url"
            className="focus:outline-none rounded-sm p-2 border border-gray-500 w-full"
          />
          <button
            disabled={loading}
            className="p-1.5 border bg-blue-600 text-white rounded-md w-full"
          >
            {loading ? 'Loading...' : 'Share'}
          </button>
        </div>
      </div>
    </form>
  );
};
