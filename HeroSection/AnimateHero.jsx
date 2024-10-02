"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactRotatingText from "react-rotating-text";

const AnimateHero = () => {
  const [is1stImageInFront, setIs1stImageInFront] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIs1stImageInFront((prev) => !prev);
    }, 3000); // change the time as needed

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <>
      <div className="w-full">
        <section className=" flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          {/* Left Side Content */}
          <div className="w-full lg:w-[40%] p-5 md:p-10 lg:p-16 space-y-6">
            <h1 className="text-2xl md:text-4xl lg:text-6xl text-center lg:text-left font-semibold text-gray-700 leading-snug">
              <ReactRotatingText
                items={[
                  "Easy Scheduling Ahead",
                  "Effortless Booking Experience",
                  "Stay Organized with Our Tool",
                  "Your Time, Your Control",
                ]}
              />
            </h1>
            <p className="lg:text-lg text-center lg:text-left font-medium text-gray-400">
              Join 20 million professionals who easily book meetings with the #1
              scheduling tool.
            </p>
            <div className="flex justify-center lg:justify-start">
              <button className="btn bg-primaryColor hover:bg-primaryColorLight text-white">
                <div className="bg-white p-1 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#ffc107"
                      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                    ></path>
                    <path
                      fill="#ff3d00"
                      d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                    ></path>
                    <path
                      fill="#4caf50"
                      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                    ></path>
                    <path
                      fill="#1976d2"
                      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                    ></path>
                  </svg>
                </div>
                <span className="px-4">Sign Up With Google</span>
              </button>
            </div>
          </div>

          {/* Right Side Image Section */}
          <div className="w-full lg:w-[60%] flex justify-center p-5 md:p-10">
            <section className="relative w-full flex justify-center items-center">
              <div
                className={`relative w-full border-primaryColorExtraLight border rounded-2xl transition-all duration-1000 ease-in-out transform ${
                  is1stImageInFront
                    ? "z-20 opacity-100 scale-100 translate-y-0"
                    : "z-10 opacity-50 scale-90 -translate-y-12"
                }`}
              >
                <h2 className="rounded-t-2xl bg-primaryColorExtraLight py-2 md:py-5 text-lg md:text-2xl font-medium px-5 md:px-10">
                  Share Your Booking Page
                </h2>
                <Image
                  src="https://res.cloudinary.com/dydv6uxzo/image/upload/v1727786778/Appointment_Plugin/1_xysms6.png"
                  width={1000}
                  height={1000}
                  className="w-full h-auto object-contain rounded-2xl"
                  alt="Appointment Image"
                />
              </div>

              <div
                className={`absolute w-full border border-primaryColorExtraLight rounded-2xl transition-all duration-1000 ease-in-out transform ${
                  is1stImageInFront
                    ? "z-10 opacity-50 scale-90 -translate-y-12"
                    : "z-20 opacity-100 scale-100 translate-y-0"
                }`}
              >
                <h2 className="rounded-t-2xl bg-primaryColorExtraLight py-2 md:py-5 text-lg md:text-2xl font-medium px-5 md:px-10">
                  Book Effortlessly & Stay On Your Track
                </h2>
                <Image
                  src="https://res.cloudinary.com/dydv6uxzo/image/upload/v1727786777/Appointment_Plugin/2_dotywz.png"
                  width={1000}
                  height={1000}
                  className="w-full h-auto object-contain rounded-2xl"
                  alt="Appointment Image"
                />
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default AnimateHero;
