import { useEffect, useRef, useState } from "react";
const CountableSection = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting==true && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    
    if (!hasAnimated) return;
    const startTime = Date.now();
    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuad = (t) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);
      setCount(Number((easedProgress * end).toFixed(2)));
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };
    requestAnimationFrame(updateCount);
  }, [hasAnimated, end, duration]);

  return (
    <div ref={counterRef}  style={{width:"110px"}}>
      <span>{count}</span>
    </div>
  );
};

export default CountableSection;
