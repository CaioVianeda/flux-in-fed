import styled from "styled-components";
import "./App.css";
import GlobalStyles from "./components/GlobalStyles";
import Scheduling from "./pages/Scheduling";

const BackgroundApp = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  return (
    <>
      <BackgroundApp>
      <GlobalStyles />
        <Scheduling/>
      </BackgroundApp>
    </>
  );
}

export default App;
