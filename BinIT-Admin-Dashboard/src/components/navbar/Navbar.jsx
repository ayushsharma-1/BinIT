import LogoNoIcon from "../../img/binitlogo.png";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <a href="localhost:3000">
        <div className="headerlogo">
          <img src={LogoNoIcon} alt="Binit Services" />
        </div>
      </a>
      <div className="wrapper">
        <div className="space"></div>
        <div className="items">
        </div>
      </div>
    </div>
  );
};

export default Navbar;
