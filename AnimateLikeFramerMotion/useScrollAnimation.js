import { useEffect } from "react";

const useScrollAnimation = (ref, animationClass) => {
  useEffect(() => {
    // If the ref is not assigned to any element, exit the hook
    if (!ref.current) return;

    // Create a new IntersectionObserver instance
    const observer = new IntersectionObserver((entries) => {
      // Loop through all observed elements (there's usually only one here)
      entries.forEach((entry) => {
        // Check if the element is in the viewport (isIntersecting is true)
        if (entry.isIntersecting) {
          // Add the animation class to the element
          entry.target.classList.add(animationClass);
          // Optionally unobserve the element so the animation only triggers once
          observer.unobserve(entry.target); // Only trigger once
        }
      });
    });
    // Start observing the element (ref.current points to the DOM element)
    observer.observe(ref.current);

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, [ref, animationClass]); // Re-run the effect if the ref or animationClass changes
};

export default useScrollAnimation;
