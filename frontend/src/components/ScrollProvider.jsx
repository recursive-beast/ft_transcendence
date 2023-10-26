"use client";

import { usePathname } from "next/navigation";

const { createContext, useState, useEffect } = require("react");

export const ScrollContext = createContext(null);

export function ScrollProvider({ defaultValue, ...props }) {
  const state = useState(defaultValue);
  const [scroll, setScroll] = state;
  const pathname = usePathname();

  useEffect(() => {
    setScroll(true);
  }, [pathname]);

  return <ScrollContext.Provider value={state} {...props} />;
}
