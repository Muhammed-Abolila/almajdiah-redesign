import { useEffect, useRef } from "react";
const AutoResizeIframe = ({ children }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      window.parent.postMessage(
        { type: "contentHeight", height: element.offsetHeight || 1500 },
        "*",
      );
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={containerRef}>{children}</div>;
};
export default AutoResizeIframe;
