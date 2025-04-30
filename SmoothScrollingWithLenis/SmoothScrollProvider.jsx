"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const SmoothScrollProvider = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 0, // No delay, instant response
      easing: (t) => t, // Linear easing for instant scroll
      smooth: true, // Enable smooth scroll
      direction: "vertical", // Vertical scroll
      gestureDirection: "both", // Support both touchpad and mouse wheel
      smoothTouch: true, // Smooth scrolling for touch devices
      touchMultiplier: 1, // Default touch response (1x)
      infinite: false, // Set to true for continuous scrolling if needed
    });

    lenisRef.current = lenis;

    // Animation frame to maintain smooth scroll behavior
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Clean up when component unmounts
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>; // Render the children inside the provider
};

export default SmoothScrollProvider;
