import { useEffect, useState } from "react";

import style from "./style.module.css";
import http from "../../../service/http";
import { IService } from "../../../shared/interfaces/IService";
import { Add, Check, Close, Edit } from "@mui/icons-material";
import React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import TextField from "@mui/material/TextField";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        prefix="R$ "
        allowNegative={false}
        decimalScale={2}
        allowedDecimalSeparators={[","]}
      />
    );
  }
);

const ManageServices = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [newService, setNewService] = useState<IService>({
    id: 0,
    nome: "",
    preco: 0,
  });

  useEffect(() => {
    http.get<IService[]>("/procedimentos").then((response) => {
      setServices(response.data);
    });
  }, []);

  const handleChangeNewServiceName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewService((prevState) => ({
      ...prevState,
      nome: event.target.value,
    }));
  };

  const handleChangeNewServicePrice = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewService((prevState) => ({
      ...prevState,
      preco: Number(event.target.value),
    }));
  };

  const handleDeleteService = (id: Number) => {
    http.delete(`/procedimentos/${id}`);
    setServices(services.filter((service) => service.id !== id));
  };

  const handleSaveService = () => {
    const body = {
      nome: newService.nome,
      preco: newService.preco,
    };

    if (!newService.nome || newService.nome === "") {
      alert("Digite um nome para o serviço!");
    } else if (!newService.preco || newService.preco === 0) {
      alert("Digite um valor para o serviço!");
    } else if (newService.id === 0) {
      http.post("/procedimentos", body).then((response) => {
        alert("Procedimento criado com sucesso!");
        setServices((prevState) => [...prevState, response.data]);
        setNewService({ id: 0, nome: "", preco: 0 });
      });
    } else if (newService.id !== 0) {
      http.put(`/procedimentos/${newService.id}`, body).then((response) => {
        alert("Procedimento atualizado com sucesso!");
        setServices((prevState) =>
          prevState.map((service) => {
            if (service.id === newService.id) {
              return newService;
            }
            return service;
          })
        );
        setNewService({ id: 0, nome: "", preco: 0 });
      });
    }
  };

  return (
    <div id={style.container}>
      <div className={style.services}>
        <form
          style={{
            maxWidth: "450px",
            padding: "5px",
            backgroundColor: "#fff",
            borderRadius: "8px",
          }}
        >
          <p id={style.title}>Serviços</p>
          <div id={style["service__options-container"]}>
            {services &&
              services.map((service) => {
                if (service.ativo) {
                  return (
                    <div className={style.service__option} key={service.id}>
                      <div className={style.service__option_info}>
                        <p>{service.nome}</p>
                        <p>R$ {service.preco},00</p>
                      </div>
                      <div className={style.service__option_button}>
                        <Edit
                          fontSize="small"
                          style={{ cursor: "pointer", marginLeft: "15px" }}
                          onClick={() => setNewService(service)}
                        />
                        <div
                          onClick={() => {
                            handleDeleteService(service.id);
                          }}
                        >
                          <Close
                            fontSize="small"
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            <div className={style.add_service__container}>
              <TextField
                label="Nome"
                value={newService.nome}
                onChange={handleChangeNewServiceName}
                variant="standard"
                size="medium"
                sx={{ width: "120px" }}
                slotProps={{
                  input: {
                    style: { fontFamily: "nunito", fontSize: "15px" },
                  },
                  inputLabel: {
                    style: { fontFamily: "nunito", fontSize: "15px" },
                  },
                }}
              />
              <TextField
                label="Preço"
                value={newService.preco}
                onChange={handleChangeNewServicePrice}
                size="small"
                slotProps={{
                  inputLabel: {
                    style: { fontFamily: "nunito", fontSize: "15px" },
                  },
                  input: {
                    style: { fontFamily: "nunito", fontSize: "15px" },
                    inputComponent: NumericFormatCustom as any,
                  },
                }}
                variant="standard"
                sx={{ width: "100px" }}
              />
              <div onClick={handleSaveService}>
                {newService.id === 0 ? (
                  <Add style={{ cursor: "pointer", marginLeft: "15px" }} />
                ) : (
                  <Check style={{ cursor: "pointer", marginLeft: "15px" }} />
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageServices;
