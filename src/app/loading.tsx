import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 dark:bg-[#1e293b] absolute top-0 right-0 bottom-0 left-0">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary dark:border-primary-dark dark:border-t-transparent border-t-transparent shadow-lg"></div>
        <p className="text-lg font-medium text-default-black dark:text-white">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
