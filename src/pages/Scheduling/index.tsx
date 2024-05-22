import styled from "styled-components";
import ScheduleFormComponent from "../../components/ScheduleFormComponent"
import { useState } from "react";
import ClientFormComponent from "../../components/ClientFormComponent";
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
/* ${(props)=> props.$active === true ? `border-bottom: solid 2px #000000` : ''} */


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
        <Title  onClick={() => changeSelectedMenu("ClientForm")}>Cliente</Title>
        <Title  onClick={() =>  client ? changeSelectedMenu("ScheduleForm") : alert("Prencha o formulário!")} >Agendar</Title>
      </Nav>
      {activeMenu === "ClientForm" && <ClientFormComponent changeSelectedMenu={changeSelectedMenu} handleClient={handleClient}/>} 
      {activeMenu === "ScheduleForm" && <ScheduleFormComponent client={client!}/>} 
    </>
  );
};

export default Scheduling;
