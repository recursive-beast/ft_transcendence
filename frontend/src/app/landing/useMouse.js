import { useState, useEffect } from "react";

export const useMouse = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const updateMousePosition = e => {
    setMouse({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    document.addEventListener("mousemove", updateMousePosition);

    return () => {
        document.removeEventListener("mousemove", updateMousePosition);
    }
  }, []);

  return mouse;
};
