import styled from "styled-components";

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
  background-image: url(${(props) => props.$backgroundImageUrl});
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const Price = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

const OptionComponent = (props) => {
  const backgroundImageUrl = props.option.nome ?
    "/images/" +
    props.option.nome
      .toLowerCase()
      .replace(" e ", "-")
      .replace(" ", "-")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") +
    ".jpg"
    :
    '';

    return (
      <Service
        $backgroundImageUrl={backgroundImageUrl}
        onClick={() =>
          props.selected({
            id: props.option.id,
            nome: props.option.nome,
          })
        }
      >
        <Name>{props.option.nome}</Name>
        {props.option.preco && <Price>{`R$${props.option.preco},00`}</Price>}
      </Service>
    );
};

export default OptionComponent;
