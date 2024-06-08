import { useContext } from "react";
import styled from "styled-components";
//@ts-ignore
import { ScheduleContext } from "../../../../../context/ScheduleContext";

const Service = styled.div`
  width: 190px;
  height: 190px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 3px 1px -2px;
  box-shadow: 0px -50px 50px rgba(255, 255, 255, 0.767) inset;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const Price = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

interface OptionProps {
  option: IOption;
  typeSelection: string;
}

const Option = ({ option, typeSelection }: OptionProps) => {
  //@ts-ignore
  const { setSelectedService, setSelectedBarber } = useContext(ScheduleContext);

  const backgroundImageUrl = option.nome
    ? "/images/" +
      option.nome
        .toLowerCase()
        .replace(" e ", "-")
        .replace(" ", "-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") +
      ".jpg"
    : "";

  function selected(option: IOption) {
    typeSelection === "servico"
      ? setSelectedService(option)
      : setSelectedBarber(option);
  }

  return (
    <Service
      onClick={() => selected(option)}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <Name>{option.nome}</Name>
      {option.preco && <Price>{`R$${option.preco},00`}</Price>}
    </Service>
  );
};

export default Option;
