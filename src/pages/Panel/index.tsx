import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import style from "./style.module.css";
import { memo, useEffect } from "react";
import { pagesTitle } from "../../utils/constants/constants";
import { useLoadEmployee } from "../../state/hooks/employee/useLoadSetEmployee";

const Panel = () => {
  const location = useLocation();
  const loadEmployee = useLoadEmployee();

  useEffect(() => {
    loadEmployee(1);
  }, []);

  return (
    <div id={style["container__main"]}>
      <NavBar />
      <div id={style["container__section"]}>
        <Header
          pageName={
            pagesTitle[`${location.pathname}`]
          }
        />
        <Outlet />
      </div>
    </div>
  );
};

export default memo(Panel) ;
