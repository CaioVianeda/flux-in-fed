import { useEffect, useState } from "react";
import style from "./style.module.css";
import http from "../../../service/http";
import { IBarber as IEmployee } from "../../../shared/interfaces/IBarber";
import { Add, Edit } from "@mui/icons-material";
import CreateEmployee from "./CreateEmployee";
import { useEmployeesList } from "../../../state/hooks/useEmployee/useEmployeesList";
import { useSetEmployeesList } from "../../../state/hooks/useEmployee/useSetEmployeesList";

const ManageEmployees = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee| undefined >();
  // const [employees, setEmployees] = useState<IEmployee[]>([]);
  const employees = useEmployeesList();
  const setEmployees = useSetEmployeesList();
  const [createNewEmployee, setCreateNewEmployee] = useState<Boolean>(false);

  useEffect(() => {
    http.get<IEmployee[]>("/barbeiros").then((response) => {
      setEmployees(response.data);
    });
  }, []);

  const onEditEmployee = (employee: IEmployee) => {
    setCreateNewEmployee(true);
    setSelectedEmployee(employee);
  }

  return (
    <div id={style.container}>
      <div id={style.employees}>
        <p id={style.title}>Funcionários</p>
        <div className={style.employees__employee}>
          <div className={style.employees__employee_infos}>
            <div className={`${style.employees__employee_info_title}`} >
              Nome
            </div>
            <div className={`${style.employees__employee_info_title}`} style={{justifyContent: "center"}}>
              Email
            </div>
            <div className={`${style.employees__employee_info_title}` }style={{justifyContent: "center"}} >
              Telefone
            </div>
            <div className={style.employees__employee_button}>
            
            </div>
          </div>
        </div>
        <div id={style["employees__container"]}>
          {employees &&
            employees.map((employee) => {
              return (
                <div className={style.employees__employee} key={employee.id}>
                  <div className={style.employees__employee_infos}>
                    <div
                      className={`${style.employees__employee_info} ${style.name}`}
                    >
                      {employee.nome}
                    </div>
                    <div
                      className={`${style.employees__employee_info} ${style.email}`}
                    >
                      {employee.email}
                    </div>
                    <div
                      className={`${style.employees__employee_info} ${style.telephone}`}
                    >
                      {employee.telefone}
                    </div>
                  </div>
                  <div className={style.employees__employee_button} onClick={() => onEditEmployee(employee)}>
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
              <Add style={{ cursor: "pointer"}} />
            </div>
          ) : (
            <CreateEmployee
              setCreateNewEmployee={setCreateNewEmployee}
              setSelectedEmployee={setSelectedEmployee}
              employee={selectedEmployee}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageEmployees;