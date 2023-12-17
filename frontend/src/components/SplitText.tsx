"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { debounce } from "lodash";

export function SplitText({
  Component = "div",
  onLineCount = undefined,
  ...props
}: any) {
  const ref = useRef(null);

  function split() {
    const split = new SplitType(ref.current, { types: "lines" });

    onLineCount?.(split.lines.length);

    return () => {
      split.revert();
    };
  }

  useEffect(() => {
    let revertSplit = split();
    const debouncedSplit = debounce(() => {
      revertSplit = split();
    }, 500);

    window.addEventListener("resize", debouncedSplit);

    return () => {
      debouncedSplit.cancel();
      window.removeEventListener("resize", debouncedSplit);
      revertSplit();
    };
  }, []);

  return <Component {...props} ref={ref} />;
}
