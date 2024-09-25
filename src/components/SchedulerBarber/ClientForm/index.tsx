import TextField from "@mui/material/TextField";

import style from "./style.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { Autocomplete } from "@mui/material";
import http from "../../../../service/http";
import { IClient } from "../../../../shared/interfaces/IClient";
import PerfilCard from "../../../../components/PerfilCard";
import { Close } from "@mui/icons-material";

interface Props{
  setSelectedClient:  React.Dispatch<React.SetStateAction<IClient | undefined>>;
}

const ClientForm = ({setSelectedClient}: Props) => {
  const [clients, setClients] = useState<IClient[]>([]);
  const [client, setClient] = useState<IClient>({
    id: "",
    nome: "",
    telefone: "",
  });

  const options = clients.map((client) => {
    const firstLetter = client.nome[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...client,
    };
  });

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setClient((prevState) => ({
      ...prevState,
      nome: e.target.value,
    }));
  };

  const handleChangeTelephone = (e: ChangeEvent<HTMLInputElement>) => {
    setClient((prevState) => ({
      ...prevState,
      telefone: e.target.value,
    }));

    if (e.target.value.length === 13) {
      const clientFinded = clients.find((client) => {
        return client.telefone === e.target.value;
      });

      if (clientFinded) {
        setClient(clientFinded);
        setSelectedClient(clientFinded);
      } else {
        setClient((prevState) => ({
          ...prevState,
          nome: "",
        }));
      }
    }
  };

  useEffect(() => {
    http
      .get<IClient[]>("/clientes")
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.log("Erro ao carregar os clientes: " + error);
      });
  }, []);

  if (client.id === "") {
    return (
      <div id={style.container}>
        <p className={style.title}>Cliente</p>
        <form className={style["container-form"]}>
          <TextField
            id="standard-required"
            label="Telefone"
            variant="standard"
            type="tel"
            value={client.telefone}
            name="telefone"
            size="small"
            slotProps={{
              input: { style: { width: "300px" } },
              inputLabel: { style: { fontFamily: "nunito", fontSize: "14px" } },
            }}
            onChange={handleChangeTelephone}
          />
          {client.id === "" ? (
            <Autocomplete
              sx={{ width: "300px" }}
              options={options.sort(
                (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
              )}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.nome
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="standard-required"
                  label="Nome"
                  variant="standard"
                  type="text"
                  value={client.nome}
                  name="nome"
                  size="small"
                  slotProps={{
                    inputLabel: {
                      style: { fontFamily: "nunito", fontSize: "14px" },
                    },
                  }}
                  onChange={handleChangeName}
                />
              )}
              onChange={(event, value) => {
                if (value && typeof value !== "string") {
                  setClient({
                    id: value.id,
                    nome: value.nome,
                    telefone: value.telefone,
                  });
                  setSelectedClient({
                    id: value.id,
                    nome: value.nome,
                    telefone: value.telefone,
                  });
                }
              }}
              renderOption={(props, option) => (
                <li {...props} key={`${option.id}`}>
                  {option.nome}
                </li>
              )}
              freeSolo
            />
          ) : (
            <TextField
              id="standard-required"
              label="Nome"
              variant="standard"
              type="text"
              value={client.nome}
              name="nome"
              size="small"
              slotProps={{
                input: { style: { width: "300px" } },
                inputLabel: {
                  style: { fontFamily: "nunito", fontSize: "14px" },
                },
              }}
              onChange={handleChangeName}
            />
          )}
        </form>
      </div>
    );
  } else {
    return (
      <div id={style.container}>
        <p className={style.title}>Cliente</p>
        <div className={style["container__client-card"]}>
          <PerfilCard barber={client.nome} barberShop={client.telefone} />
          <div
            className={style.button}
            onClick={() => {
              setClient({
                id: "",
                nome: "",
                telefone: "",
              });
            }}
          >
            <Close color="action" sx={{ width: "18px" }} />
          </div>
        </div>
      </div>
    );
  }
};

export default ClientForm;
