import style from "./style.module.css";
import Lupa from '../../assets/lupa.png'

const SearchText = () => {
  return (
    <div className={style["input-container"]}>
      <input type="text" placeholder="Buscar" className={style.input} />
      {/* <img className={style.icon} src={Lupa} alt="lupa" width={18} /> */}
    </div>
  );
};

export default SearchText;