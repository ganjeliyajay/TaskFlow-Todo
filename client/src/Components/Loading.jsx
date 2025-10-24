import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50 backdrop-blur-[3px]">
      <div className="w-7 h-7 border-5 border-gray-200 border-t-red-400 rounded-full animate-spin"></div>
    </div>
  );
}


