import { useState, useEffect } from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const updateMousePosition = e => {
    setMousePosition({ x: e.pageX, y: e.pageY });
  };

  const updateMousePositionOnScroll = () => {
    setMousePosition(({x, y}) => ({ x, y: y + window.scrollY }));
  };

  useEffect(() => {
    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("scroll", updateMousePositionOnScroll);

    return () => {
        document.removeEventListener("mousemove", updateMousePosition);
        document.removeEventListener("scroll", updateMousePositionOnScroll);
    }
  }, []);

  return mousePosition;
};

export default useMousePosition;
