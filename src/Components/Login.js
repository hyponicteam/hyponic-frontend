import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import "./style/Login/login.css";
import Logo from "./img/logo.png";
import Styled, { keyframes } from "styled-components";
import { zoomIn } from "react-animations";
import { AuthContext } from "../App";
import axios from "axios";
const qs = require("querystring");
const api = "http://192.168.196.12:8000/api/auth/login";

const ZoomIn = Styled.div`
  animation: 1.5s ${keyframes`${zoomIn}`};
`;

const Login = (props) => {
  //panggil context
  const { dispatch } = useContext(AuthContext);

  //initial state
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };

  //bikin data use state
  const [data, setData] = useState(initialState);

  //ngehandle fungsi change inputan
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    //request dari body api untuk ngambil email dan password
    const requestBody = {
      email: data.email,
      password: data.password,
    };

    //konfigurasi header
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    //panggil axios
    axios.post(api, qs.stringify(requestBody), config).then((res) => {
      if (res.data.meta.code === 200) {
        dispatch({
          type: "LOGIN",
          //ngambil data dari api dan ditampung di payload
          payload: res.data,
        });
        props.history.push("/Home");
      } else {
        setData({
          ...data,
          isSubmitting: false,
          //ngambil error message ketika gagal
          errorMessage: "login gagal",
        });
        console.log(res);
      }
      throw res;
    });
  };

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
            <form onSubmit={handleFormSubmit}>
              <div className="input-form">
                <label for="name">Email</label>
                <input className="input" type="text" name="email" id="email" onChange={handleInputChange} value={data.email} />
              </div>
              <div className="input-form">
                <div className="label-pass">
                  <label className="label-pass" for="password">
                    Kata sandi
                  </label>
                  <p>Lupa kata sandi ?</p>
                </div>
                <input className="input" type="password" name="password" id="password" onChange={handleInputChange} value={data.password} />
              </div>
              <div className="check">
                <input className="input-checkbox" type="checkbox" name="check-privacy" id="input-checkbox" />
                <label for="input-checkbox">
                  Saya setuju dengan <span>kebijakan privasi layanan.</span>
                </label>
              </div>
              {data.errorMessage && <p>{data.errorMessage}</p>}
              <button className="btn-join" disabled={data.isSubmitting}>
                {data.isSubmitting ? "...loading" : "Masuk Sekarang"}
              </button>
            </form>
          </div>
        </ZoomIn>
      </div>
    </div>
  );
};

export default Login;
