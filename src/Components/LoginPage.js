import "./style/loginPage/loginPage.css";
import Navbar from "./Navbar";
import LoginForm from "./LoginForm";
import Footer from "./Footer";

function LoginPage() {
  return (
    <div className="Loginpage">
      <Navbar className="navbar" />
      <LoginForm className="loginForm" />
      <Footer className="footer" />
    </div>
  );
}

export default LoginPage;
