import { css } from "@emotion/react";

import { SLIDE_DURATION } from "../constant";

import type { FC } from "react";

const Left = css({
  position: "absolute",
  top: 0,
  left: 0,
  transform: "translateX(-100%)",
});

const Right = css({
  position: "absolute",
  top: 0,
  left: 0,
  transform: "translateX(100%)",
});

const Center = css({
  position: "relative",
  transform: "translateX(0%)",
});

type Props = {
  index: number;
  currentPage: number;
};

const Page: FC<Props> = ({ children, index, currentPage }) => {
  return (
    <div
      css={[
        Math.abs(currentPage - index) > 1 && { display: "none" },
        { transition: `transform ${SLIDE_DURATION}ms ease-in-out` },
        currentPage === index && Center,
        currentPage === index + 1 && Left,
        currentPage === index - 1 && Right,
      ]}
    >
      {children}
    </div>
  );
};

export default Page;
