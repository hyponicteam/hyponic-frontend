import { Link, useHistory } from "react-router-dom";
import React from "react";
import "./style/Login/login.css";
import Logo from "./img/logo.png";
import Styled, { keyframes } from "styled-components";
import { zoomIn } from "react-animations";
import { login } from "../utils/auth";
import axios from "axios";
const qs = require("querystring");
const api = "http://192.168.196.12:8000/api/auth/login";

const ZoomIn = Styled.div`
  animation: 1.5s ${keyframes`${zoomIn}`};
`;

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    if (email || password) {
      setError(false);
    }
    return () => {};
  }, [email, password]);

  const _onSubmit = (event) => {
    event.preventDefault();
    console.log(email);
    const requestBody = {
      email: email,
      password: password,
    };

    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    axios.post(api, qs.stringify(requestBody), config).then((res) => {
      if (res.data.meta.code === 200) {
        login({
          email: email,
          token: res.data.data.access_token,
        });
        props.history.push("/dashboard");
      } else {
        setError(true);
      }
    });
  };

  return (
    <div className="container">
      <div className="left-container">
        <img src={Logo} alt="" />
        <p className="link link-logo">Hyponic</p>
        <h2>Masuk Sekarang</h2>
        <p>Masuk Hyponic sekarang juga untuk mendapatkan hasil panen tanaman hidroponik yang memuaskan</p>
        <h4>Belum punya akun ?</h4>
        <Link className="link link-toLogin" to={"/Register"}>
          Register
        </Link>
      </div>
      <div className="right-container">
        <ZoomIn>
          <div className="register-form">
            <h2>Masuk Akun</h2>
            <form onSubmit={_onSubmit}>
              <div className="input-form">
                <label for="name">Email</label>
                <input className="input" type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input-form">
                <div className="label-pass">
                  <label className="label-pass" for="password">
                    Kata sandi
                  </label>
                  <p>Lupa kata sandi ?</p>
                </div>
                <input className="input" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="check">
                <input className="input-checkbox" type="checkbox" name="check-privacy" id="input-checkbox" />
                <label for="input-checkbox">
                  Saya setuju dengan <span>kebijakan privasi layanan.</span>
                </label>
              </div>
              <button className="btn-join" type="submit">
                Masuk
              </button>
            </form>
          </div>
        </ZoomIn>
      </div>
    </div>
  );
};

export default Login;
