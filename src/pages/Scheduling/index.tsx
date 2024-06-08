import styled from "styled-components";
import ScheduleFormComponent from "../../components/ScheduleFormComponent"
import { useState } from "react";
import ClientFormComponent from "../../components/ClientForm";
import { IClient } from "../../shared/interfaces/IClient";

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
`

const Scheduling = () => {

  const [activeMenu, setActiveMenu] = useState("ClientForm");
  const [client, setClient] = useState<IClient>();

  function handleClient(client: IClient){
    setClient(client);
    changeSelectedMenu("ScheduleForm");
  }

  function changeSelectedMenu(menu: string){
    setActiveMenu(menu);
  }  

  return (
    <>
      <Nav>
        <Title  onClick={() => changeSelectedMenu("ClientForm")} style={ { borderBottom: activeMenu === "ClientForm" ? 'solid 2px #000000' : ''}}>Cliente</Title>
        <Title  onClick={() =>  client ? changeSelectedMenu("ScheduleForm") : alert("Prencha o formulário!")} style={ { borderBottom: activeMenu === "ScheduleForm" ? 'solid 2px #000000' : ''}}>Agendar</Title>
      </Nav>
      {activeMenu === "ClientForm" && <ClientFormComponent changeSelectedMenu={changeSelectedMenu} handleClient={handleClient}/>} 
      {activeMenu === "ScheduleForm" && <ScheduleFormComponent client={client!}/>} 
    </>
  );
};

export default Scheduling;
