import "./style/loginForm/loginForm.css";
import logo from "./img/logo.svg";

function LoginForm() {
  return (
    <div className="loginForm">
      <div className="loginForm-left">
        <img className="logoLoginPage" src={logo} alt="" />
        <h2>Masuk Untuk Jelajahi Lebih!</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit, Doloremque mollitia dignissimos obcaecati tempora.</p>
      </div>
      <div className="loginForm-right">
        <div className="right-card">
          <div className="right-card__inputLogin">
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Password" />
          </div>
          <div className="right-card__submitLogin">
            <input type="submit" value="Masuk" className="darkSubmit" />
            <input type="submit" value="Daftar" className="transparantSubmit" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
