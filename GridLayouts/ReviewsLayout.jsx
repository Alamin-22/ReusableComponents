"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import getReviews from "@/Lib/getReviews";
import Rating from "@/Components/Shared/Rating";

const ViewAllReviewsPage = () => {
  const originalReviews = getReviews();

  // Starting with 44 for xl devices, 33 for lg devices , 22 for tab and 14 for mobile
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(44);
  // Distribute the visible reviews into 4 columns for xl devices, into 3 columns for Lg Devices
  const [columnsCount, setColumnsCount] = useState(4);

  // Function to handle resizing and update visible reviews count and columns based on device size
  const updateLayoutForScreenSize = () => {
    const width = window.innerWidth;

    if (width >= 1280) {
      // xl devices
      setVisibleReviewsCount(44);
      setColumnsCount(4);
    } else if (width >= 1024) {
      // lg devices
      setVisibleReviewsCount(33);
      setColumnsCount(3);
    } else if (width >= 768) {
      // tab devices
      setVisibleReviewsCount(22);
      setColumnsCount(2);
    } else {
      // mobile devices
      setVisibleReviewsCount(14);
      setColumnsCount(1);
    }
  };

  // Hook to update layout on initial render and on window resize
  useEffect(() => {
    updateLayoutForScreenSize();
    window.addEventListener("resize", updateLayoutForScreenSize);

    return () => {
      window.removeEventListener("resize", updateLayoutForScreenSize);
    };
  }, []);

  const handleLoadMoreData = () => {
    setVisibleReviewsCount((prevCount) => prevCount + 12);
  };

  // Slice the reviews to show only the number of visible reviews
  const visibleReviews = originalReviews.slice(0, visibleReviewsCount);

  // Distribute the visible reviews into columns based on the device size
  const columns = Array.from({ length: columnsCount }, () => []);
  visibleReviews.forEach((review, idx) => {
    columns[idx % columnsCount].push(review);
  });

  let globalIdx = 0;

  return (
    <section className="">
      <div className="text-center space-y-2 p-5">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium">
          Glimpses of Glamour through Our Clients’ Eyes
        </h1>
        <p className="text-sm md:text-lg text-gray-600 tracking-wide">
          Your beauty, our passion—reflected in every word, genuine testimonials
          from our community across various platforms.
        </p>
      </div>

      <div
        className="p-5 md:p-10 2xl:p-20 grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`,
        }}
      >
        {/* Render each column */}
        {columns.map((columnReviews, columnIndex) => (
          <div key={columnIndex} className="grid gap-4">
            {/* render each Review */}
            {columnReviews.map((review) => {
              globalIdx++;

              return (
                <div key={globalIdx} className="h-auto max-w-full rounded-lg">
                  <div className="card bg-base-100 border shadow-sm">
                    <figure className="px-10 pt-8">
                      <div className="avatar">
                        <div className="w-16 rounded-full">
                          <Image
                            src={review?.AuthorImg}
                            width={100}
                            height={100}
                            alt={review.AuthorName || "user"}
                          />
                        </div>
                      </div>
                    </figure>
                    <div className="card-body items-center text-center">
                      <h2 className="card-title">{review?.AuthorName}</h2>
                      <h3 className="font-medium text-gray-400">
                        Posted On {review?.postedTime}
                      </h3>
                      <p className="text-justify tracking-wider">
                        &quot;{review?.reviewText || review?.reviewText2}&quot;
                      </p>
                      <div className="flex items-center justify-between w-full">
                        <Rating rating={review.rating} />
                        <div className="font-medium text-gray-400 items-center gap-2 flex">
                          Provided on
                          <div
                            dangerouslySetInnerHTML={{
                              __html: review?.providedBy,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleReviewsCount < originalReviews?.length && (
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

export default ViewAllReviewsPage;
