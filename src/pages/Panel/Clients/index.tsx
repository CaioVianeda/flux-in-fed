import { Container } from "@mui/material";
import ClientCard from "./ClientCard";
import { useEffect, useState } from "react";
import http from "../../../service/http";
import { IClient } from "../../../shared/interfaces/IClient";
import SearchText from "../../../components/SeachText";

const Clients = () => {
  
  const [clients, setClients] = useState<IClient[]>();

  useEffect(()=>{
    http.get("/clientes")
    .then((response) => {
      setClients(response.data);
    })
  })

  return (
    <Container sx={{p: '20px', display: "flex", flexDirection: 'column',gap: '10px'}}>
      <SearchText/>
      {clients?.map((client) => {
        return <ClientCard client={client} key={client.id}/>
      })}
    </Container>
  );
};

export default Clients;
