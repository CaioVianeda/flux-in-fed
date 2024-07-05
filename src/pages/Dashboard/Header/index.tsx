import "./style.css";

interface Props{
    barber: string,
    barberShop: string,
    pageName: string
}

const Header = ({barber, barberShop, pageName}: Props) => {
  return (
    <header>
      <div className="info">
        <div className="icon"/>
        <div className="name">
          <div className="name__barber">{barber}</div>
          <div className="name__barber-shop">{barberShop}</div>
        </div>
      </div>
      <div className="title">{pageName}</div>
    </header>
  );
};

export default Header;
