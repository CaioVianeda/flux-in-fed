import styled from "styled-components";
import "./App.css";
import GlobalStyles from "./components/GlobalStyles";
import ScheduleFormComponent from "./components/ScheduleFormComponent";

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
        <h1>Agendar</h1>
        <ScheduleFormComponent/>
      </BackgroundApp>
    </>
  );
}

export default App;
