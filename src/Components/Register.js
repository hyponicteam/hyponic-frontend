import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import "./style/Register/register.css";
import Logo from "./img/logo.png";
import Styled, { keyframes } from "styled-components";
import { zoomIn } from "react-animations";

import { AuthContext } from "../App";
import axios from "axios";
const qs = require("querystring");
const api = "http://192.168.196.12:8000/api/auth/register";

const ZoomIn = Styled.div`
  animation: 1.5s ${keyframes`${zoomIn}`};
`;

const Register = (props) => {
  //memanggil context
  const { dispatch } = useContext(AuthContext);

  //initial state
  const initialState = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    isSubmitting: false,
    errorMessage: null,
  };

  //bikin data use state
  const [data, setData] = useState(initialState);

  //fungsi input handle change
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  //fungsi ketika form di submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    //ketika data didapatkan, maka akan merequest body
    const requestBody = {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
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
        setData({
          ...data,
          isSubmitting: false,
        });

        // //redirect ke dashboard - vid2
        // props.history.push("/Login");
        alert("pendaftaran anda berhasil");
      } else {
        setData({
          ...data,
          isSubmitting: false,
          //mengambil data dari api dan ditampung
          errorMessage: res.meta.message,
        });
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
        <h2>Gabung Sekarang</h2>
        <p>Gabung dengan Hyponic sekarang juga untuk mendapatkan hasil panen tanaman hidroponik yang memuaskan</p>
        <h4>Sudah punya akun ?</h4>
        <Link className="link link-toLogin" to={"/"}>
          Masuk
        </Link>
      </div>
      <div className="right-container">
        <ZoomIn>
          <div className="register-form">
            <h2>Buat Akun</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="input-form">
                <label for="name">Nama</label>
                <input onChange={handleInputChange} value={data.name} className="input" type="text" name="name" id="name" />
              </div>
              <div className="input-form">
                <label for="email">Email</label>
                <input onChange={handleInputChange} value={data.email} className="input" type="email" name="email" id="name" />
              </div>
              <div className="input-form">
                <label for="password">Kata sandi</label>
                <input onChange={handleInputChange} value={data.password} className="input" type="password" name="password" id="password" />
              </div>
              <div className="input-form">
                <label for="password">Konfirmasi Kata sandi</label>
                <input onChange={handleInputChange} value={data.password_confirmation} className="input" type="password" name="password_confirmation" id="password_confirmation" />
              </div>
              <div className="check">
                <input className="input-checkbox" type="checkbox" name="check-privacy" id="input-checkbox" />
                <label for="input-checkbox">
                  Saya setuju dengan <span>kebijakan privasi layanan.</span>
                </label>
              </div>
              {data.errorMessage && <p>{data.errorMessage}</p>}
              <button className="btn-join" disabled={data.isSubmitting}>
                {data.isSubmitting ? "...loading" : "Gabung Sekarang"}
              </button>
            </form>
          </div>
        </ZoomIn>
      </div>
    </div>
  );
};

export default Register;
