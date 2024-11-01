import { TextField } from "@mui/material";
import style from "./style.module.css";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { IBarber as IEmployee } from "../../../../shared/interfaces/IBarber";
import { useRecoilValue } from "recoil";
import { establishmentState } from "../../../../state/atom";
import useUpdateEmployee from "../../../../state/hooks/employee/useUpdateEmployee";
import useCreateEmployee from "../../../../state/hooks/employee/useCreateEmployee";

interface Props {
  setCreateNewEmployee: React.Dispatch<React.SetStateAction<Boolean>>;
  setSelectedEmployee: React.Dispatch<
    React.SetStateAction<IEmployee | undefined>
  >;
  employee?: IEmployee;
}

const CreateEmployee = ({
  setCreateNewEmployee,
  setSelectedEmployee,
  employee,
}: Props) => {
  const [name, setName] = useState<string>(employee ? employee.nome : "");
  const [telephone, setTelephone] = useState<string>(
    employee ? employee.telefone : ""
  );
  const [email, setEmail] = useState<string>(employee ? employee.email : "");
  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();
  const estabelishment = useRecoilValue(establishmentState);

  useEffect(() => {
    setName(employee ? employee.nome : "");
    setTelephone(employee ? employee.telefone : "");
    setEmail(employee ? employee.email : "");
  }, [employee]);

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
    } else if (telephone.replace(/\D/g, "").length !== 11) {
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
      idBarbearia: estabelishment.id,
      telefone: telephone,
      email: email,
    };

    if (employee === undefined) {
      await createEmployee(newEmployee, 1);
      setCreateNewEmployee(false);
    } else {
      await updateEmployee(newEmployee, Number(employee.id));
      setCreateNewEmployee(false);
      setSelectedEmployee(undefined);
    }
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
