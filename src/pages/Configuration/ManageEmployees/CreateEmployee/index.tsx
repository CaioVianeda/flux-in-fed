import { TextField } from "@mui/material";
import style from "./style.module.css";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import useCreateEmployee from "../../../../state/hooks/useEmployees/useCreateEmployee";
import { IBarber } from "../../../../shared/interfaces/IBarber";

interface Props {
  setCreateNewEmployee: React.Dispatch<React.SetStateAction<Boolean>>;
  setEmployees: React.Dispatch<React.SetStateAction<IBarber[]>>;
}

const CreateEmployee = ({ setCreateNewEmployee, setEmployees }: Props) => {
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const createEmployee = useCreateEmployee();

  const formatTelephoneNumber = (input: String) => {
    const cleaned = input.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d)?(\d{4})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2] || ""} ${match[3]}-${match[4]}`;
    }
    return cleaned;
  };

  const handleTelephoneChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTelephone(formatTelephoneNumber(e.target.value));
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const checkFields = (): Boolean => {
    if (name === "") {
      alert("Digite o nome do funcionário!");
      return false;
    } else if (telephone === "") {
      alert("Digite o telefone do funcionário!");
      return false;
    } else if (telephone.length !== 16) {
      alert("Digite um telefone válido!");
      return false;
    } else if (email === "") {
      alert("Digite o email do funcionário!");
      return false;
    } else if (!validateEmail(email)) {
      alert("Digite um email válido!");
      return false;
    }
    return true;
  };

  const onCreateEmployee = async () => {
    let newEmployee = {
      nome: name,
      telefone: telephone,
      email: email,
    };

    const createdEmployee = await createEmployee(newEmployee, 1);
    setCreateNewEmployee(false);
    setEmployees((prev) => [...prev, createdEmployee]);
  };

  return (
    <div className={style.container__new_employee}>
      <TextField
        label="Nome"
        value={name}
        size="small"
        fullWidth
        slotProps={{
          inputLabel: {
            style: { fontFamily: "nunito", fontSize: "15px" },
          },
          input: {
            style: { fontFamily: "nunito", fontSize: "15px" },
          },
        }}
        variant="standard"
        sx={{ width: "65%" }}
        onChange={(event) => setName(event.target.value)}
      />

      <TextField
        label="E-mail"
        size="small"
        type="email"
        value={email}
        slotProps={{
          inputLabel: {
            style: { fontFamily: "nunito", fontSize: "15px" },
          },
          input: {
            style: { fontFamily: "nunito", fontSize: "15px" },
          },
        }}
        variant="standard"
        sx={{ width: "80%" }}
        onChange={(event) => setEmail(event.target.value)}
      />

      <TextField
        id="standard-required"
        label="Telefone"
        variant="standard"
        type="tel"
        name="telefone"
        size="small"
        value={telephone}
        fullWidth
        slotProps={{
          input: {
            style: { fontFamily: "nunito", fontSize: "15px" },
          },
          inputLabel: {
            style: { fontFamily: "nunito", fontSize: "15px" },
          },
          htmlInput: { maxLength: 16 },
        }}
        sx={{ width: "65%" }}
        onChange={(event) => handleTelephoneChange(event)}
      />
      <div
        className={style.add_employee}
        onClick={() => checkFields() && onCreateEmployee()}
      >
        <Add style={{ cursor: "pointer", marginLeft: "15px" }} />
      </div>
    </div>
  );
};

export default CreateEmployee;
