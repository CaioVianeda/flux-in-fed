import { Link, Outlet, useLocation } from "react-router-dom";

import styles from "./style.module.css";
import PerfilCard from "../../components/PerfilCard";
import { useRecoilValue } from "recoil";
import { employeeState, establishmentState } from "../../state/atom";

const Configuration = () => {

  const location = useLocation();
  const employee = useRecoilValue(employeeState);
  const establishment = useRecoilValue(establishmentState)

  return (
    <div id={styles["container-menu"]}>
      <div id={styles.menu}>
        <section>
          <PerfilCard mainInformation={employee.nome} secondInformation={establishment.nome}/>
        </section>
        <section>
          <p className={styles["section__title"]}>Configurações da Conta</p>
          <Link to={'my-account'}><p className={`${styles["section__option"]} ${location.pathname === '/configure/my-account' && styles["section__option-active"]}`}>Minha Conta</p></Link>
    
        </section>
        <section>
          <p className={styles["section__title"]}>Administração</p>
          <Link to={'manage-services'}><p className={`${styles["section__option"]} ${location.pathname === '/configure/manage-services' && styles["section__option-active"]}`}>Atendimentos</p></Link>
          <Link to={'manage-employees'}><p className={`${styles["section__option"]} ${location.pathname === '/configure/manage-employees' && styles["section__option-active"]}`}>Funcionários</p></Link>
        </section>
        <section>
          <p className={styles["section__title"]}>Sistema</p>
          <Link to={'customize'}><p className={`${styles["section__option"]} ${location.pathname === '/configure/customize' && styles["section__option-active"]}`}>Configurações Gerais</p></Link>
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
