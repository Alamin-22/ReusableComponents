import React, { useRef } from "react";

const SCROLL_AMOUNT = 15; // Pixels to scroll per frame

const TableMovingButton = ({ tableId = "" }) => {
  const containerRef = useRef(null);
  const animationFrameId = useRef(null);

  const startScrolling = (direction) => {
    const container = document.getElementById(tableId)?.parentElement;

    if (container) {
      containerRef.current = container;
      const scrollAmount =
        direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT;

      const scroll = () => {
        if (containerRef.current) {
          containerRef.current.scrollLeft += scrollAmount;
          animationFrameId.current = requestAnimationFrame(scroll);
        }
      };

      scroll();
    }
  };

  const stopScrolling = () => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  };

  return (
    <div className=" hidden lg:flex gap-5 mx-4 text-primaryColor  ">
      <button
        onMouseDown={() => startScrolling("left")}
        onMouseUp={stopScrolling}
        onMouseLeave={stopScrolling}
        onTouchStart={() => startScrolling("left")} // For mobile touch support
        onTouchEnd={stopScrolling} // For mobile touch support
        aria-label="Scroll Left"
      >
        <div className="text-2xl active:scale-90 transition-transform cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-.72 4.594L9.595 15.28l-.72.72l.72.72l5.687 5.686L16.72 21l-4-4H23v-2H12.72l4-4z"
            ></path>
          </svg>
        </div>
      </button>
      <button
        onMouseDown={() => startScrolling("right")}
        onMouseUp={stopScrolling}
        onMouseLeave={stopScrolling}
        onTouchStart={() => startScrolling("right")} // For mobile touch support
        onTouchEnd={stopScrolling} // For mobile touch support
        aria-label="Scroll Right"
      >
        <div className="text-2xl active:scale-90 transition-transform cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m.72 4.594L15.28 11l4 4H9v2h10.28l-4 4l1.44 1.406l5.686-5.687l.72-.72l-.72-.72l-5.687-5.686z"
            ></path>
          </svg>
        </div>
      </button>
    </div>
  );
};

export default TableMovingButton;
