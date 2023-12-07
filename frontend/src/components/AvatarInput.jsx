"use client";

import { fetcher } from "@/common";
import { useRef } from "react";
import { mutate } from "swr";

export function AvatarInput({ onError, className, children }) {
  const ref = useRef(null);

  async function uploadAvatar(event) {
    const file = event.target.files[0];
    const formData = new FormData();

    formData.append("avatar", file);

    try {
      await fetcher("/users/me/avatar", {
        method: "POST",
        body: formData,
      });
      await mutate("/users/me");
    } catch (error) {
      onError?.(error);
    }
  }

  return (
    <button className={className} onClick={() => ref.current.click()}>
      {children}
      <input
        className="hidden"
        type="file"
        accept="image/*"
        ref={ref}
        onChange={uploadAvatar}
      />
    </button>
  );
}
