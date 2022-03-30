import styled from "@emotion/styled";
import { loremIpsum } from "lorem-ipsum";
import { useState } from "react";

import Page from "./components/Page";
import PageSlider from "./components/PageSlider";

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

const Card = styled.div({
  width: "40em",
  border: "1px solid #BDC3C7",
  borderRadius: "1em",
});

const lorem = () => loremIpsum({ count: Math.ceil(Math.random() * 30) });

function App() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState(() => Array.from({ length: 5 }, lorem));

  const regenerateText = () => {
    setData(Array.from({ length: 5 }, lorem));
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
      <Card css={{ marginTop: "1em" }}>
        <PageSlider>
          {data.map((text, i) => (
            <Page key={text} index={i} currentPage={page}>
              <div css={{ padding: "1em" }}>{`${i} ${text}`}</div>
            </Page>
          ))}
        </PageSlider>
      </Card>
    </Container>
  );
}

export default App;
