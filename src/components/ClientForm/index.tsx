import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import api from "../../service/http";
import { IClient } from "../../shared/interfaces/IClient";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
  input {
    border-radius: 5px;
    border: solid 1px #000;
    height: 25px;
    padding: 10px;
  }

  button {
    background-color: #000;
    color: #fff;
    width: 120px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 500;
    font-size: 18px;
  }
`;

interface ClientFormProps {
  changeSelectedMenu: (menu: string) => void,
  handleClient: (client: IClient) => void
}

const ClientForm = ({ changeSelectedMenu, handleClient }: ClientFormProps) => {

  const [clients, setClients] = useState<IClient[]>([]);
  const [createClient, setCreateClient] = useState(false);
  const [formData, setFormData] = useState({telefone: "",nome: "",});

  useEffect(() => {
    api.get(`/clientes`).then((response) => (setClients(response.data)));
  },[])

  const searchClient = (phone: string) => {
    
    const findedClient = clients.find(
      (client) => client.telefone === phone
    );

    if (findedClient) {
      alert(`Olá ${findedClient.nome}, bem vindo de novo!`);
      changeSelectedMenu("ScheduleForm");
      handleClient(findedClient);
      return;
    }
    setCreateClient(true);
  };

  const createNewClient = () => {
    api.post('/clientes', formData)
    .then((response) => handleClient(response.data))
    .catch((error) => {
      console.log(error);
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createClient ? createNewClient() : searchClient(formData.telefone);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <FormContainer>
      {
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            placeholder="Digite seu telefone"
            required
            onChange={handleChange}
          />
          {
            createClient &&
            <input
              type="text"
              name="nome"
              value={formData.nome}
              placeholder="Digite seu nome"
              required
              onChange={handleChange}
            />
          }
          <button type="submit">Enviar</button>
        </form>
      }
    </FormContainer>
  );
};

export default ClientForm;
