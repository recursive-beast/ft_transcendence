"use client";

import { useState, useRef } from "react";
import {
  useScroll,
  motion,
  useTransform,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import clsx from "clsx";
import { SplitText } from "./SplitText";

export function MaskedLines({ children, className, offset, ...props }) {
  const ref = useRef(null);
  const [lineCount, setLineCount] = useState(1);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset || ["start center", "end center"],
  });

  const transform = useTransform(scrollYProgress, [0, 1], [100 * lineCount, 0]);
  const left = useMotionTemplate`${transform}%`;

  return (
    <div className="relative" {...props} ref={ref}>
      <SplitText className={className}>{children}</SplitText>

      <SplitText
        onLineCount={setLineCount}
        Component={motion.div}
        className={clsx("absolute top-0 left-0 w-full h-full", className)}
        style={{ "--left": left, "--line-count": lineCount }}
      >
        {children}
      </SplitText>
    </div>
  );
}
