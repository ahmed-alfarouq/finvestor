import React from "react";

const loading = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 absolute top-0 right-0 bottom-0 left-0">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-lg"></div>
        <p className="text-lg font-medium text-default-black">Loading...</p>
      </div>
    </div>
  );
};

export default loading;
