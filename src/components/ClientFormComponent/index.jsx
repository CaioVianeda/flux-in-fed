import { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ClientFormComponent = ({ changeSelectedMenu, handleClient }) => {
  const mockClients = [
    {
      name: "Caio Junior",
      phone: "41984206429",
    },
    {
      name: "Pinto Caio",
      phone: "41984206428",
    },
    {
      name: "Jesus Vianeda",
      phone: "41984206427",
    },
  ];

  const [formData, setFormData] = useState({
    phone: "",
    name: "",
  });

  const [createClient, setCreateClient] = useState(false);

  const searchClient = (phone) => {
    const findedClient = mockClients.filter(
      (client) => client.phone === phone
    )[0];

    if (findedClient) {
      alert(`Olá ${findedClient.name}, bem vindo de novo!`);
      changeSelectedMenu("ScheduleForm");
      handleClient(findedClient);
      return;
    }
    setCreateClient(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createClient ? handleClient(formData) : searchClient(formData.phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <FormContainer>
      {!createClient && (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            placeholder="Digite seu telefone"
            required
            onChange={handleChange}
          />
          <button type="submit" />
        </form>
      )}
      {createClient && (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            placeholder="Digite seu telefone"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Digite seu nome"
            required
            onChange={handleChange}
          />
          <button type="submit" />
        </form>
      )}
    </FormContainer>
  );
};

export default ClientFormComponent;
