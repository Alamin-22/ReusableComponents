"use client";

import "./animation.css";
import { useRef } from "react";
import useScrollAnimation from "@/Hooks/AnimationRelated/useScrollAnimation";

const ManicureSection = () => {
  // for animation triggering  purpose on specific section
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);

  useScrollAnimation(leftSectionRef, "animate-slide-left");
  useScrollAnimation(rightSectionRef, "animate-slide-right");
  // for animation triggering  purpose end
  return (
    <>
      <section className="bg-primaryColorWhiteShade overflow-hidden space-y-10 md:space-y-16 p-5 lg:p-10 xl:p-20">
        {/* first container */}
        <div
          ref={leftSectionRef} // we just have to target that section with Ref
          className="bg-[#fff9f9] flex flex-col md:flex-row justify-center items-center  rounded-lg"
        ></div>
        {/* Second container */}
        <div
          ref={rightSectionRef} // we just have to target that section with Ref
          className="bg-[#fff9f9] flex flex-col md:flex-row-reverse justify-center items-center rounded-lg"
        ></div>
      </section>
    </>
  );
};

export default ManicureSection;
