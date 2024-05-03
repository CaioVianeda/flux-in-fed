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
  const backgroundImageUrl =
    "/images/" +
    props.options.name
      .toLowerCase()
      .replace(" e ", "-")
      .replace(" ", "-")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") +
    ".jpg";

    return (
      <Service
        $backgroundImageUrl={backgroundImageUrl}
        onClick={() =>
          props.typeSelection === "servico" 
          ?
          props.selectedService({
            id: props.options.id,
            name: props.options.name,
          })
          :
          props.selectedBarber({
            id: props.options.id,
            name: props.options.name,
          })
        }
      >
        <Name>{props.options.name}</Name>
        {props.options.price && <Price>{`R$${props.options.price},00`}</Price>}
      </Service>
    );
};

export default OptionComponent;
