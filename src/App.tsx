import styled from "@emotion/styled";

import logo from "./assets/logo.svg";

const Container = styled.div({
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Logo = styled.img({
  width: "32em",
  aspectRatio: "1/1",
});

function App() {
  return (
    <Container>
      <h1>React Boilerplate</h1>
      <Logo src={logo} alt="logo" />
    </Container>
  );
}

export default App;
