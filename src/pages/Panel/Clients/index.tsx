import { Container } from "@mui/material";
import ClientCard from "./ClientCard";
import { memo, useEffect } from "react";
import SearchText from "../../../components/SeachText";
import { useLoadClients } from "../../../state/hooks/useClients/useLoadClients";
import { useClientsList } from "../../../state/hooks/useClients/useClientsList";

const Clients = () => {
  const clients = useClientsList();
  const loadClients = useLoadClients();

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <Container
      sx={{ p: "20px", display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <SearchText />
      {clients?.map((client) => {
        return <ClientCard client={client} key={client.id} />;
      })}
    </Container>
  );
};

export default memo(Clients);