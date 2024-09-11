import { Link, Outlet, useLocation } from "react-router-dom";
//@ts-ignore
import styles from "./style.module.css";
import PerfilCard from "../../components/PerfilCard";

const Configuration = () => {

  const location = useLocation();
  return (
    <div id={styles["container-menu"]}>
      <div id={styles.menu}>
        <section>
          <PerfilCard barber="Camila" barberShop="Bichozen Pet Store"/>
        </section>
        <section>
          <p className={styles["section__title"]}>Configurações da Conta</p>
          <Link to={'my-account'}><p className={`${styles["section__option"]} ${location.pathname === '/configure/my-account' && styles["section__option-active"]}`}>Minha Conta</p></Link>
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
