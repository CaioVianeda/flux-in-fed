//@ts-ignore
import style from "./style.module.css";
//@ts-ignore
import Lupa from '../../assets/lupa.png'

const SearchText = () => {
  return (
    <div className={style["input-container"]}>
      <input type="text" placeholder="Buscar" />
      <img className={style.icon} src={Lupa} alt="lupa" width={18} />
    </div>
  );
};

export default SearchText;