//@ts-ignore
import style from "./style.module.css";

const Configuration = () => {
  return (
    <div id={style.container}>
      <div id={style.menu}>
        <section>
          <div id={style.perfil}>
          </div>
        </section>
        <section>
          <p className={style["section__title"]}>Configurações de Conta</p>
          <p className={style["section__option"]}>Minha Conta</p>
        </section>

      </div>
      <div id={style.configurations}>Configurações</div>
    </div>
  );
};

export default Configuration;
