import { Link } from "react-router-dom";
import React from "react";
import "./style/Tambah_Tanaman/Tambah_Tanaman.css";
import Styled, { keyframes } from "styled-components";
import { zoomIn } from "react-animations";
const ZoomIn = Styled.div`
  animation: 1.5s ${keyframes`${zoomIn}`};
`;

const Login = () => {
  return (
    <div className="container">
      <div className="right-container">
        <ZoomIn>
          <div className="Tanaman-form">
            <h2>Tanamanku</h2>
            <div className="input-form">
              <label for="name">Buat Tanaman Baru Anda</label>
              <input className="input" type="text" name="name" id="name" />
            </div>
            <Link className="btn-join" to={"/Home"}>
              Simpan
            </Link>
            <Link className="btn-join2" to={"/Home"}>
              batal
            </Link>
          </div>
        </ZoomIn>
      </div>
      </div>
  );
};

export default Login;
