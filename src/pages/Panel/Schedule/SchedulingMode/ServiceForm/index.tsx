import { Dispatch, SetStateAction, useEffect, useState } from "react";

import style from "./style.module.css";
import http from "../../../../../service/http";
import { IService } from "../../../../../shared/interfaces/IService";
interface Props {
  selectedServices: IService[];
  setSelectedServices: Dispatch<SetStateAction<IService[]>>;
}

const ServiceForm = ({ selectedServices, setSelectedServices }: Props) => {
  const [services, setServices] = useState<IService[]>([]);

  useEffect(() => {
    http
      .get<IService[]>("/procedimentos")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log("Não foi possível carregar o serviços: " + error);
      });
  }, []);

  const handleServicesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedServices((prev) => {
      if (checked) {
        return [...prev, JSON.parse(value)];
      } else {
        return prev.filter((option) => option.id !== JSON.parse(value).id);
      }
    });
  };
  const totalPriceServices = (services: IService[]): Number => {
    let total = 0;
    services.forEach((service) => {
      total += service.preco;
    });
    return total;
  };

  return (
    <div className={style.select_services}>
      <form
        style={{
          maxWidth: "450px",
          padding: "5px",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
        <p className={style.title}>Serviços</p>
        <div className={style["select_service__options-container"]}>
          {services.map((service) => {
            if (service.ativo) {
               return (
                <label
                  htmlFor={`${service.nome}`}
                  className={style.select_service__option}
                  key={service.id}
                >
                  <input
                    id={`${service.nome}`}
                    type="checkbox"
                    value={JSON.stringify(service)}
                    onChange={handleServicesChange}
                  />
                  <div className={style.select_service__option_info}>
                    <p>{service.nome}</p>
                    <p>R$ {service.preco},00</p>
                  </div>
                </label>
              );
            }
          })}
          <div className={style["card-total"]}>
            <p>Total</p>
            <p>{`R$${totalPriceServices(selectedServices)},00`}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
