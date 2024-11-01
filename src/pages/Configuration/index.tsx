import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./style.module.css";
import PerfilCard from "../../components/PerfilCard";
import { useEmployee } from "../../state/hooks/employee/useEmployee";
import { useEstablishment } from "../../state/hooks/establishment/useEstablishment";

const Configuration = () => {

  const location = useLocation();
  const employee = useEmployee()
  const establishment = useEstablishment();

  const isThisPage = (path : string):boolean =>{
    return location.pathname === path;
  }

  return (
    <div id={styles["container-menu"]}>
      <div id={styles.menu}>
        <section>
          <PerfilCard mainInformation={employee.nome} secondInformation={establishment.nome} image="../../../public/images/employee/employee.jpg"/>
        </section>
        <section>
          <p className={styles["section__title"]}>Configurações da Conta</p>
          <Link to={''}><p className={`${styles["section__option"]} ${isThisPage('/configure') && styles["section__option-active"]}`}>Minha Conta</p></Link>
        </section>
        <section>
          <p className={styles["section__title"]}>Administração</p>
          <Link to={'manage-services'}><p className={`${styles["section__option"]} ${location.pathname === '/configure/manage-services' && styles["section__option-active"]}`}>Atendimentos</p></Link>
          <Link to={'manage-employees'}><p className={`${styles["section__option"]} ${location.pathname === '/configure/manage-employees' && styles["section__option-active"]}`}>Funcionários</p></Link>
        </section>
        <section> 
          <Link to={'/panel'}><p className={`${styles["section__option"]} ${styles["exit"]}`}>Sair</p></Link>
        </section>
      </div>
      <div id={styles.configurations}>
        <Outlet/>
      </div>
    </div>
  );
};

export default Configuration;