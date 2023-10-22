"use client";

const { createContext, useState } = require("react");

export const ScrollContext = createContext(null);

export function ScrollProvider({defaultValue, ...props}) {
  const state = useState(defaultValue);

  return <ScrollContext.Provider value={state} {...props} />;
}
