import { Link } from "react-router-dom";
import React from "react";
import "./style/Login/login.css";
import Logo from "./img/logo.png";
import Styled, { keyframes } from "styled-components";
import { zoomIn } from "react-animations";

const ZoomIn = Styled.div`
  animation: 1.5s ${keyframes`${zoomIn}`};
`;

const Login = () => {
  return (
    <div className="container">
      <div className="left-container">
        <img src={Logo} alt="" />
        <Link className="link link-logo" to={"/Home"}>
          Hyponic
        </Link>
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
            <div className="input-form">
              <label for="name">Nama</label>
              <input className="input" type="text" name="name" id="name" />
            </div>
            <div className="input-form">
              <div className="label-pass">
                <label className="label-pass" for="password">
                  Kata sandi
                </label>
                <p>Lupa kata sandi ?</p>
              </div>
              <input className="input" type="password" name="password" id="password" />
            </div>
            <div className="check">
              <input className="input-checkbox" type="checkbox" name="check-privacy" id="input-checkbox" />
              <label for="input-checkbox">
                Saya setuju dengan <span>kebijakan privasi layanan.</span>
              </label>
            </div>
            <Link className="btn-join" to={"/Home"}>
              Masuk Sekarang
            </Link>
          </div>
        </ZoomIn>
      </div>
    </div>
  );
};

export default Login;
