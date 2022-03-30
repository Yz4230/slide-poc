import { animated, useSpring } from "react-spring";
import useMeasure from "react-use-measure";

import { SLIDE_DURATION } from "../constant";

import type { FC } from "react";

const PageSlider: FC = ({ children }) => {
  const [ref, { height }] = useMeasure();

  const styles = useSpring({
    to: {
      height: height > 0 ? `${height}px` : undefined,
    },
    config: {
      duration: SLIDE_DURATION,
    },
  });

  return (
    <animated.div css={{ overflow: "hidden" }} style={styles}>
      <div ref={ref} css={{ position: "relative" }}>
        {children}
      </div>
    </animated.div>
  );
};

export default PageSlider;
