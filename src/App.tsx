import styled from "@emotion/styled";
import { loremIpsum } from "lorem-ipsum";
import { useState } from "react";
import { animated, useSpring } from "react-spring";
import useMeasure from "react-use-measure";

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
  padding: "1em",
});

const lorem = () => loremIpsum({ count: Math.ceil(Math.random() * 30) });

function App() {
  const [text, setText] = useState(lorem);
  const [overlapText] = useState(lorem);
  const [ref, { height }] = useMeasure();
  const [started, setStarted] = useState(false);

  const styles = useSpring({
    to: {
      height: height > 0 ? `${height}px` : undefined,
    },
  });

  const toRightStyle = useSpring({
    cancel: !started,
    from: {
      transform: "translateX(0%)",
    },
    to: {
      transform: "translateX(100%)",
    },
  });

  const fromLeftStyles = useSpring({
    cancel: !started,
    from: {
      transform: "translateX(-100%)",
    },
    to: {
      transform: "translateX(0%)",
    },
  });

  const regenerateText = () => setText(lorem);

  return (
    <Container>
      <Button onClick={regenerateText}>Regenerate text</Button>
      <Button css={{ marginTop: "1em" }} onClick={() => setStarted(true)}>
        Start
      </Button>
      <PageContainer css={{ marginTop: "1em" }} style={styles}>
        <div ref={ref} css={{ position: "relative", overflow: "hidden" }}>
          <animated.p
            css={{
              display: "inline-block",
              position: started ? "absolute" : "relative",
            }}
            style={toRightStyle}
          >
            {text}
          </animated.p>
          <animated.p
            css={{
              display: "inline-block",
              position: started ? "relative" : "absolute",
              top: 0,
              left: 0,
              color: "red",
            }}
            style={fromLeftStyles}
          >
            {overlapText}
          </animated.p>
        </div>
      </PageContainer>
    </Container>
  );
}

export default App;
