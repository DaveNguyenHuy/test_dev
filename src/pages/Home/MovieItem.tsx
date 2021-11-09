import { BiLike, BiDislike } from 'react-icons/bi';

export const MovieItem = () => {
  return (
    <div className="flex space-x-8 max-w-screen-lg">
      <iframe
        src="cc"
        title="title"
        height="240"
        width="360"
        className="border-gray-800 border flex-shrink-0 rounded-sm"
      />
      <div>
        <div className="flex justify-between w-full">
          <div className="w-4/5">
            <h2 className="text-2xl font-bold">Video Title</h2>
            <p className="text-gray-500">Shared by: example@gmail.com</p>
          </div>
          <div className="flex space-x-2">
            <BiLike className="w-6 h-6" />
            <BiDislike className="w-6 h-6" />
          </div>
        </div>
        <p className="mt-2 text-lg">Description:</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ducimus voluptates
          inventore necessitatibus doloribus dolores aspernatur consectetur eaque vitae ab culpa,
          deserunt tempore aperiam recusandae quod corrupti eius, voluptatem sunt!
        </p>
      </div>
    </div>
  );
};
