import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { loremIpsum } from "lorem-ipsum";
import { useState } from "react";
import { animated, useSpring } from "react-spring";
import useMeasure from "react-use-measure";

const SLIDE_DURATION = 500;

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

const Transision = css({
  transition: `transform ${SLIDE_DURATION}ms ease-in-out`,
});

type SlideDirection = "left" | "right";

const Container = styled.div({
  width: "100vw",
  minHeight: "100vh",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Button = styled.button({
  padding: "1em",
  border: "none",
  borderRadius: "0.5em",
  cursor: "pointer",
});

const PageContainer = styled(animated.div)({
  width: "40em",
  border: "1px solid #BDC3C7",
  borderRadius: "1em",
  overflow: "hidden",
});

const Page = styled("div")({
  padding: "1em",
});

const lorem = () => loremIpsum({ count: Math.ceil(Math.random() * 30) });

function App() {
  const [page, setPage] = useState(0);
  const [data, setTexts] = useState(() =>
    Array.from({ length: 5 }, () => lorem())
  );
  const [ref, { height }] = useMeasure();

  const styles = useSpring({
    to: {
      height: height > 0 ? `${height}px` : undefined,
    },
    config: {
      duration: SLIDE_DURATION,
    },
  });

  const regenerateText = () => {
    setTexts(Array.from({ length: 5 }, () => lorem()));
  };

  const slide = (direction: SlideDirection) => {
    setPage((page) => {
      if (direction === "left") {
        return Math.max(page - 1, 0);
      }
      return Math.min(page + 1, data.length - 1);
    });
  };

  return (
    <Container>
      <Button onClick={regenerateText}>Regenerate text</Button>
      <div
        css={{
          marginTop: "1em",
          display: "flex",
          alignItems: "center",
          gap: "1em",
        }}
      >
        <Button onClick={() => slide("left")}>Move Left</Button>
        <div>{page}</div>
        <Button onClick={() => slide("right")}>Move Right</Button>
      </div>
      <PageContainer css={{ marginTop: "1em" }} style={styles}>
        <div ref={ref} css={{ position: "relative" }}>
          {data.map((text, i) => (
            <Page
              key={text}
              css={[
                Math.abs(page - i) > 1 && { display: "none" },
                Transision,
                page === i && Center,
                page === i + 1 && Left,
                page === i - 1 && Right,
              ]}
            >
              {`${i} ${text}`}
            </Page>
          ))}
        </div>
      </PageContainer>
    </Container>
  );
}

export default App;
