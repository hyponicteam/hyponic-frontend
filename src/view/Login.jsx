// dependency
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//asset/komponen
import { login } from "../utils/auth";
import style from "./style/login.module.css";
import { BASE_API_URL } from "../constants/urls";
import FailedLogin from "../Components/Modal/FailedLogin";
import Logo from "../assets/img/logo.png";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const _onSubmit = (event) => {
    event.preventDefault();
    //request body
    const requestBody = {
      email: email,
      password: password,
    };

    //config
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    //axios post
    axios
      .post(BASE_API_URL + "/auth/login", requestBody, config)
      .then(function (res) {
        login({
          email: email,
          token: res.data.data.access_token,
        });
        props.history.push("/dashboard");
      })
      .catch(function () {
        setModalShow(true);
      });
  };

  const masukDemo = () => {
    const requestBody = {
      email: "demo@hyponic.com",
      password: "demohyponic",
    };

    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    axios
      .post(BASE_API_URL + "/auth/login", requestBody, config)
      .then(function (res) {
        login({
          email: "demo@hyponic.com",
          token: res.data.data.access_token,
        });
        props.history.push("/dashboard");
      })
      .catch(function () {
        setModalShow(true);
      });
  };

  return (
    <>
      <div className={style.login_container}>
        <div className={style.login_left}>
          <img src={Logo} alt="" className={style.brand_logo} />
          <p className={style.brand_text}>Hyponic</p>
          <h2 className={style.heading_left}>Masuk Sekarang</h2>
          <p className={style.left_description}>Masuk Hyponic sekarang juga untuk mendapatkan hasil panen tanaman hidroponik yang memuaskan</p>
          <Link className={style.btn_register} to={"/Register"}>
            Daftar
          </Link>
        </div>
        <div className={style.login_right}>
          <div className={style.login_form}>
            <h2 className={style.login_title}>Masuk Akun</h2>
            <form className={style.login_container_form} onSubmit={_onSubmit}>
              <div className={style.input_form_container}>
                <label htmlFor="email" className={style.label_form}>
                  Email
                </label>
                <input required type="text" className={style.input_form} name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className={style.input_form_container}>
                <label htmlFor="password" className={style.label_form}>
                  Kata Sandi
                </label>
                <input required type="password" className={style.input_form} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button className={(style.btn, style.btn_login)}>Masuk</button>
              <button className={(style.btn, style.btn_login)} onClick={masukDemo}>
                Masuk Demo
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* modal */}
      <FailedLogin show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default Login;
