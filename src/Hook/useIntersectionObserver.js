import { useEffect, useState, useRef } from 'react';

const useIntersectionObserver = (options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (options && options.triggerOnce && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else {
          if (!(options && options.triggerOnce)) {
            setIsIntersecting(false);
          }
        }
      },
      options
    );

    const currentElement = elementRef.current; // Simpan ke variabel lokal untuk cleanup
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]); 

  return [elementRef, isIntersecting];
};

export default useIntersectionObserver;