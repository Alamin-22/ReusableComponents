# React Component

## This repository contains a collection of reusable React components that can be easily copied and used in various projects. Each component is designed to be modular, customizable, and simple to integrate into your applications.

### Components List:

- Reusable React Components
- Animate Like Framer Motion (using CSS and JS) 🔥

---

## Animate Like Framer Motion (Using CSS and JS)

This section provides a custom hook (`useScrollAnimation`) that enables scroll-triggered animations in React components, mimicking Framer Motion’s scroll animations but using plain CSS and JavaScript.

### How it Works:

- The `useScrollAnimation` hook leverages the `IntersectionObserver` API to detect when an element enters the viewport.
- Once the element is in view, a CSS animation class is applied to the element to trigger the animation.

### Installation

You don't need to install any external dependencies for this. Simply copy the hook and corresponding CSS animations into your project.

### Usage

1. **Add the Hook and CSS Animations**:

   Copy the `useScrollAnimation.js` hook from the `Hooks/AnimationRelated` folder into your project. Also, make sure to have the corresponding CSS animations in your stylesheet.

2. **Add Ref and Hook in Your Component**:

   In the component where you want to apply the animation:

   ```javascript
   import { useRef } from "react";
   import useScrollAnimation from "@/Hooks/AnimationRelated/useScrollAnimation";
   import "./your-style.css"; // Make sure to include your CSS animations

   const YourComponent = () => {
     const sectionRef = useRef(null);

     useScrollAnimation(sectionRef, "animate-slide-left"); // This triggers a slide-left animation

     return <div ref={sectionRef}>{/* Your content */}</div>;
   };

   export default YourComponent;
   ```
