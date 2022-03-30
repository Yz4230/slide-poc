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
  const [ref, { height }] = useMeasure();

  const styles = useSpring({
    to: {
      height: height > 0 ? `${height}px` : undefined,
    },
  });

  const regenerateText = () => setText(lorem);

  return (
    <Container>
      <Button onClick={regenerateText}>Regenerate text</Button>
      <PageContainer css={{ marginTop: "1em" }} style={styles}>
        <div ref={ref}>
          <p css={{ display: "inline-block" }}>{text}</p>
        </div>
      </PageContainer>
    </Container>
  );
}

export default App;
