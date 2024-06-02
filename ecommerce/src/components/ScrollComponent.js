// src/ScrollComponent.js
import React, { useState, useEffect, useRef } from 'react';
import './scroll.css';

const ScrollComponent = ({ children, threshold = 0.1, className = '', ...rest }) => {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: threshold,
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={componentRef}
      className={`scroll-component ${isVisible ? 'visible' : ''} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default ScrollComponent;
