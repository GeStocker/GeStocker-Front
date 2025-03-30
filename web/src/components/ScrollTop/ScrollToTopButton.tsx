"use client";
import React from "react";
import { IoIosArrowRoundUp } from "react-icons/io";

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0, 
      behavior: "smooth", 
    });
  };

  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={scrollToTop}
        className="bottom-4 right-4 p-3 cursor-pointer flex items-center gap-2 rounded-md"
      >
        <IoIosArrowRoundUp className="h-6 w-6" />
        <h3>Volver</h3>
      </button>
    </div>
  );
};

export default ScrollToTopButton;