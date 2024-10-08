import { useEffect, useState } from "react";
import style from "./style.module.css";
import http from "../../../service/http";
import { IBarber } from "../../../shared/interfaces/IBarber";
import { Add, Edit } from "@mui/icons-material";
import { TextField } from "@mui/material";

const ManageEmployees = () => {
  const [employees, setEmployees] = useState<IBarber[]>([]);
  const [createNewEmployee, setCreateNewEmployee] = useState<Boolean>(false);

  useEffect(() => {
    http.get<IBarber[]>("/barbeiros").then((response) => {
      setEmployees(response.data);
    });
  }, []);

  return (
    <div id={style.container}>
      <div id={style.employees}>
        <p id={style.title}>Funcionários</p>
        <div id={style["employees__container"]}>
          {employees &&
            employees.map((employee) => {
              return (
                <div className={style.employees__employee} key={employee.id}>
                  <div className={style.employees__employee_info}>
                    <p>{employee.nome}</p>
                    <p>{employee.telefone}</p>
                  </div>
                  <div className={style.employees__employee_button}>
                    <Edit
                      fontSize="small"
                      style={{ cursor: "pointer", marginLeft: "15px" }}
                    />
                  </div>
                </div>
              );
            })}

          {!createNewEmployee ? (
            <div
              className={style.add_employee}
              onClick={() => setCreateNewEmployee(true)}
            >
              <Add style={{ cursor: "pointer", marginLeft: "15px" }} />
            </div>
          ) : (
            <div className={style.container__new_employee}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  label="Nome"
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
                  sx={{ width: "45%" }}
                />
                <TextField
                  id="standard-required"
                  label="Telefone"
                  variant="standard"
                  type="tel"
                  name="telefone"
                  size="small"
                  fullWidth
                  slotProps={{
                    input: {
                      style: { fontFamily: "nunito", fontSize: "15px" },
                    },
                    inputLabel: {
                      style: { fontFamily: "nunito", fontSize: "15px" },
                    },
                  }}
                  sx={{ width: "45%" }}
                />
              </div>

              <TextField
                label="E-mail"
                size="small"
                type="email"
                slotProps={{
                  inputLabel: {
                    style: { fontFamily: "nunito", fontSize: "15px" },
                  },
                  input: {
                    style: { fontFamily: "nunito", fontSize: "15px" },
                  },
                }}
                variant="standard"
                sx={{ width: "45%" }}
              />

              <div className={style.add_employee}>
                <Add style={{ cursor: "pointer", marginLeft: "15px" }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageEmployees;
