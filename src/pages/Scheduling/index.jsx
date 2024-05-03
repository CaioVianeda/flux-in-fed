import styled from "styled-components";
import ScheduleFormComponent from "../../components/ScheduleFormComponent";
import { useState } from "react";
import ClientFormComponent from "../../components/ClientFormComponent";

const Nav = styled.nav`
  height: 30px;
  display: flex;
  margin: 25px;
  cursor: pointer;
  gap: 10px;

`;
const Title = styled.span`
  font-size: 20px;
    display:flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    ${(props)=> props.$active === true ? `border-bottom: solid 2px #000000` : ''}
`

const Scheduling = () => {

  const [activeMenu, setActiveMenu] = useState("ClientForm");
  const [client, setClient] = useState();

  function handleClient(client){
    setClient(client);
    
  }

  function changeSelectedMenu(menu){
    console.log(client);
    setActiveMenu(menu);
  }  

  return (
    <>
      <Nav>
        <Title $active={activeMenu === "ClientForm"} onClick={() => changeSelectedMenu("ClientForm")}>Cliente</Title>
        <Title $active={activeMenu === "ScheduleForm"} onClick={() =>  client ? changeSelectedMenu("ScheduleForm") : alert("Prencha o formulário!")}>Agendar</Title>
      </Nav>
      {activeMenu === "ScheduleForm" && <ScheduleFormComponent />} 
      {activeMenu === "ClientForm" && <ClientFormComponent changeSelectedMenu={changeSelectedMenu} handleClient={handleClient}/>} 
    </>
  );
};

export default Scheduling;
