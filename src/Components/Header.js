import "./style/Header/header.css";
import HeaderImage from "./img/header-image.png";

function Header() {
  return (
    <div className="header-container">
      <div className="header-left">
        <h2 className="header-left-title">Sukseskan panenmu dengan Hyponic</h2>
        <p className="header-left-description">Hyponic membantu anda untuk memulai dan merawat tanaman hidroponik hingga panen. Dengan Hyponic, menanam hidroponik menjadi lebih muda.</p>
        <a className="header-left-cta" href="">
          Mulai Tanam
        </a>
      </div>
      <div className="header-right">
        <img className="header-image" src={HeaderImage} alt="" />
      </div>
    </div>
  );
}

export default Header;
