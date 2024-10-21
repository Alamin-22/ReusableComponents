"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import "./banner.css";

const banners = [
  {
    img: "https://res.cloudinary.com/dydv6uxzo/image/upload/v1729329840/RumaNails/Banner/slider-1_pcqk5w.webp",
    title: "Get A New Look For Your Elegant Nails",
    description:
      "Transform your nails into elegant works of art with our expert nail services.",
    LeftAlign: true,
    TextWhite: false,
  },
  {
    img: "https://res.cloudinary.com/dydv6uxzo/image/upload/v1729329840/RumaNails/Banner/slider-bg3_qu0w7j.webp",
    title: "Nail Care Like Never Before",
    description:
      "Enjoy luxurious nail care services that leave your nails healthy and beautiful.",
    LeftAlign: false,
    TextWhite: true,
  },
  {
    img: "https://res.cloudinary.com/dydv6uxzo/image/upload/v1729329840/RumaNails/Banner/slider-bg2_qbggcp.webp",
    title: "Fall In Love With Trendy Look Of Nail Art",
    description:
      "Our nail artists create stunning and unique designs for every occasion.",
    LeftAlign: true,
    TextWhite: false,
  },
];

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Track active slide

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex); // Update the active slide index on change
  };

  return (
    <section>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        onSlideChange={handleSlideChange} // Trigger animation on slide change
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {banners.map((banner, idx) => (
          <SwiperSlide key={idx}>
            <div className="w-full">
              {banner && (
                <>
                  <div className="relative xl:h-[600px] w-full">
                    <div
                      className={`absolute inset-0 flex items-center ${
                        banner?.LeftAlign
                          ? "justify-start"
                          : "justify-end text-right"
                      }`}
                    >
                      <div
                        className={`max-w-80 md:max-w-xl p-4 md:p-8 
                          ${
                            banner?.LeftAlign
                              ? activeIndex === idx
                                ? "animate-slide-in-left"
                                : ""
                              : activeIndex === idx
                              ? "animate-slide-in-right"
                              : ""
                          }
                          ${banner?.LeftAlign ? "xl:ml-12" : "xl:mr-12"}`}
                      >
                        <h2
                          className={`text-2xl md:text-4xl lg:text-5xl font-semibold mb-2 md:mb-8 ${
                            banner?.TextWhite ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {banner?.title}
                        </h2>
                        <p
                          className={`text-xs md:text-lg lg:text-xl tracking-widest font-medium mb-4 md:mb-6 ${
                            banner?.TextWhite
                              ? "text-gray-200"
                              : "text-gray-700"
                          }`}
                        >
                          {banner?.description}
                        </p>
                        <button className="btn btn-xs md:btn-lg border-primaryColor text-white hover:bg-primaryColorLight bg-primaryColor rounded-full md:text-xl hover:border-primaryColorLight">
                          Shop Now
                        </button>
                      </div>
                    </div>
                    <Image
                      src={banner?.img || ""}
                      alt="Banner Image"
                      className="w-full h-auto object-cover"
                      width={1920}
                      quality={100}
                      height={1080}
                      priority={true}
                    />
                  </div>
                </>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
