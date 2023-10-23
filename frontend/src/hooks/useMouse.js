import { useState, useEffect } from "react";

export const useMouse = () => {
  const [mouse, setMouse] = useState({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });

  const updateMousePosition = (e) => {
    setMouse({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("click", updateMousePosition);

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("click", updateMousePosition);
    };
  }, []);

  return mouse;
};
