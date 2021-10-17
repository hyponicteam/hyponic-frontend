import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style/Register/register.css";
import Logo from "../img/logo.png";
import Styled, { keyframes } from "styled-components";
import { zoomIn } from "react-animations";

const ZoomIn = Styled.div`
  animation: 1.5s ${keyframes`${zoomIn}`};
`;

const api = "http://192.168.196.12:8000/auth/api/register";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      response: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addUser = (e) => {
    e.preventDefault();
    axios
      .post(api, {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res);
      });
  };

  render() {
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
              <div className="input-form">
                <label for="name">Nama</label>
                <input className="input" type="text" name="username" id="username" placeholder="masukkan username" value={this.state.username} onChange={this.handleChange} />
              </div>
              <div className="input-form">
                <label for="email">Email</label>
                <input className="input" type="email" name="email" id="email" placeholder="masukkan email" value={this.state.email} onChange={this.handleChange} />
              </div>
              <div className="input-form">
                <label for="password">Kata sandi</label>
                <input className="input" type="password" name="password" id="password" placeholder="masukkan password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="check">
                <input className="input-checkbox" type="checkbox" name="check-privacy" id="input-checkbox" />
                <label for="input-checkbox">
                  Saya setuju dengan <span>kebijakan privasi layanan.</span>
                </label>
              </div>
              <Link onClick={this.addUser} className="btn-join" to={"/Home"}>
                Gabung Sekarang
              </Link>
              <button onClick={this.addUser}>gabung</button>
            </div>
          </ZoomIn>
        </div>
      </div>
    );
  }
}

export default Register;
