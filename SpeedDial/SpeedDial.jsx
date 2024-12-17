'use client';
import React, { useState, useEffect } from 'react';
import './dialStyle.css';

const SpeedDial = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll event
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;

    setScrollProgress(scrolled);

    // Show button only after scrolling 100px
    if (scrollTop > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {isVisible && (
        <div className='fixed bottom-2 right-2 z-50 flex flex-col items-center rounded-full bg-white active:scale-90 transition-all duration-300 text-secondary'>
          <div
            className='w-14 h-14 rounded-full flex justify-center items-center cursor-pointer relative text-secondary'
            onClick={scrollToTop}
            title='Scroll To The Top !!'
          >
            {/* Scroll Progress */}
            <div
              className='absolute inset-0 rounded-full z-0'
              style={{
                background: `conic-gradient(#684df4 ${scrollProgress}%, #e5e7eb ${scrollProgress}% 100%)`,
              }}
            ></div>

            {/* Overlay to create a circular cutout */}
            <div className='absolute inset-1 bg-white border rounded-full z-10'></div>

            {/* SVG Button */}
            <button className='p-1 md:p-2 text-secondary z-20 relative'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className=' w-7 h-7 '
              >
                <line x1='12' y1='19' x2='12' y2='5'></line>
                <polyline points='5 12 12 5 19 12'></polyline>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeedDial;
