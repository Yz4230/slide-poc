import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { loremIpsum } from "lorem-ipsum";
import { useState } from "react";
import { animated, useSpring } from "react-spring";
import useMeasure from "react-use-measure";

const ToLeft = css({
  position: "absolute",
  top: 0,
  left: 0,
  transform: "translateX(-100%)",
});

const ToRight = css({
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
  transition: "transform 1s ease-in-out",
});

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

const lorem = () => loremIpsum({ count: Math.ceil(Math.random() * 30) });

function App() {
  const [text, setText] = useState(lorem);
  const [overlapText, setOverlapText] = useState(lorem);
  const [ref, { height }] = useMeasure();
  const [started, setStarted] = useState(false);

  const styles = useSpring({
    to: {
      height: height > 0 ? `${height}px` : undefined,
    },
  });

  const regenerateText = () => {
    setText(lorem);
    setOverlapText(lorem);
  };

  return (
    <Container>
      <Button onClick={regenerateText}>Regenerate text</Button>
      <Button css={{ marginTop: "1em" }} onClick={() => setStarted(!started)}>
        {started ? "Stop" : "Start"}
      </Button>
      <PageContainer css={{ marginTop: "1em" }} style={styles}>
        <div ref={ref} css={{ position: "relative" }}>
          <div
            css={[
              {
                padding: "1em",
              },
              Transision,
              started ? ToLeft : Center,
            ]}
          >
            {text}
          </div>
          <div
            css={[
              { color: "red", padding: "1em" },
              Transision,
              !started ? ToRight : Center,
            ]}
          >
            {overlapText}
          </div>
        </div>
      </PageContainer>
    </Container>
  );
}

export default App;
