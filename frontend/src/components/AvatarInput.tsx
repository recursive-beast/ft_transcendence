"use client";

import { useRef } from "react";

export function AvatarInput({ onChange, className, children }) {
  const ref = useRef(null);

  async function onInputChange(event) {
    const file = event.target.files[0];

    if (typeof onChange === "function") {
      onChange(file);
    }
  }

  const onButtonClick = () => ref.current.click();

  return (
    <button className={className} onClick={onButtonClick}>
      {children}
      <input
        className="hidden"
        type="file"
        accept="image/*"
        ref={ref}
        onChange={onInputChange}
      />
    </button>
  );
}
