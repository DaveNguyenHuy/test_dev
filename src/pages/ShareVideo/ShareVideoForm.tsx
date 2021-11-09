export const ShareVideoForm = () => {
  return (
    <form className="mx-auto max-w-xl border-gray-700 relative border-2 px-8 py-12 rounded-md space-y-4 flex flex-col justify-end">
      <h2 className="px-2 py-0.5 rounded-sm bg-gray-50 text-2xl absolute -top-5 left-4">
        Share a Youtube Movie
      </h2>
      <div className="w-full space-x-2 flex">
        <label className="text-lg mt-1">Youtube URL:</label>
        <div className="space-y-6 flex-1">
          <input
            name="url"
            placeholder="youtube url"
            className="focus:outline-none rounded-sm p-2 border border-gray-500 w-full"
          />
          <button className="p-1.5 border bg-blue-600 text-white rounded-md w-full">Share</button>
        </div>
      </div>
    </form>
  );
};
