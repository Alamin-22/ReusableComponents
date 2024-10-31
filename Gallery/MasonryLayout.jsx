"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import getGalleryImage from "@/Lib/getGalleryImage";

const MasonryLayout = () => {
  const [, images] = getGalleryImage();

  // Starting with 44 for xl devices, 33 for lg devices , 22 for tab and 14 for mobile
  const [visibleImageCount, setVisibleImageCount] = useState(44);

  const updateLayoutForScreenSize = () => {
    const width = window.innerWidth;

    if (width >= 1280) {
      setVisibleImageCount(44);
    } else if (width >= 1024) {
      setVisibleImageCount(33);
    } else if (width >= 768) {
      setVisibleImageCount(22);
    } else {
      setVisibleImageCount(14);
    }
  };

  useEffect(() => {
    updateLayoutForScreenSize();
    window.addEventListener("resize", updateLayoutForScreenSize);

    return () => {
      window.removeEventListener("resize", updateLayoutForScreenSize);
    };
  }, []);

  const handleLoadMoreData = () => {
    setVisibleImageCount((prevCount) => prevCount + 12);
  };

  const visibleReviews = images?.slice(0, visibleImageCount);

  return (
    <section className="">
      <div className="text-center space-y-2 p-5 mt-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium">
          A Showcase of Nail Artistry and Elegance
        </h1>
        <p className="text-sm md:text-lg text-gray-600 tracking-wide">
          Explore our curated gallery, featuring stunning nail designs and
          services that highlight our commitment to beauty and precision.
        </p>
      </div>

      <div className="p-5 md:p-10 2xl:p-20 columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {/* Render the images */}
        {visibleReviews?.map((review, idx) => (
          <div key={idx} className="mb-4">
            <Image
              src={review || "https://via.placeholder.com/1000"}
              width={1000}
              height={1000}
              loading="lazy"
              className="w-full h-auto object-cover rounded-lg shadow-sm"
              alt="service Gallery Images"
            />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleImageCount < images?.length && (
        <div className="flex justify-center mb-10">
          <button
            onClick={handleLoadMoreData}
            className="px-2 md:px-4 py-2 font-semibold flex items-center gap-2 text-sm md:text-lg border-b-2 rounded-lg border-primaryColor text-primaryColor group"
          >
            Load More Reviews
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              className="w-4 h-4 md:w-6 md:h-6 ml-auto transition-transform duration-300 ease-in-out transform group-hover:translate-y-1"
              viewBox="0 0 48 48"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M24.008 35.9V12M36 24L24 36L12 24"
              ></path>
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default MasonryLayout;
