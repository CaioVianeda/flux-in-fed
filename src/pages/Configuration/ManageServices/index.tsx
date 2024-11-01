import { useEffect, useState } from "react";

import style from "./style.module.css";
import http from "../../../service/http";
import { IService } from "../../../shared/interfaces/IService";
import { Add, Check, Close, Edit } from "@mui/icons-material";
import React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import TextField from "@mui/material/TextField";
import { useServices } from "../../../state/hooks/services/useServices";
import { useLoadServices } from "../../../state/hooks/services/useLoadServices";
import { useSetServices } from "../../../state/hooks/services/useSetServices";
import { useUpdateService } from "../../../state/hooks/services/useUpdateService";
import { useAddService } from "../../../state/hooks/services/useAddService";
import { useDeleteService } from "../../../state/hooks/services/useDeleteService";

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
  const setServices = useSetServices();
  const services = useServices();
  const addService = useAddService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();
  const loadServices = useLoadServices();
  const [newService, setNewService] = useState<IService>({
    id: 0,
    nome: "",
    preco: 0,
  });

  const formatterPrice = Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  useEffect(() => {
    loadServices();
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

  const handleSaveService = () => {
    if (!newService.nome || newService.nome === "") {
      alert("Digite um nome para o serviço!");
    } else if (!newService.preco || newService.preco === 0) {
      alert("Digite um valor para o serviço!");
    } else if (newService.id === 0) {
      addService(newService);
      setNewService({ id: 0, nome: "", preco: 0 });
    } else if (newService.id !== 0) {
      updateService(newService);
      setNewService({ id: 0, nome: "", preco: 0 });
    }
  };

  return (
    <div id={style.container}>
      <div id={style.services}>
        <p id={style.title}>Serviços</p>
        <div id={style["service__options-container"]}>
          {services &&
            services.map((service) => {
              if (service.ativo) {
                return (
                  <div className={style.service__option} key={service.id}>
                    <div className={style.service__option_info}>
                      <p>{service.nome}</p>
                      <p>{formatterPrice.format(service.preco)}</p>
                    </div>
                    <div className={style.service__option_button}>
                      <Edit
                        fontSize="small"
                        style={{ cursor: "pointer", marginLeft: "15px" }}
                        onClick={() => setNewService(service)}
                      />
                      <div onClick={() => {deleteService(service.id);}}>
                        <Close fontSize="small" style={{ cursor: "pointer" }} />
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
      </div>
    </div>
  );
};

export default ManageServices;
