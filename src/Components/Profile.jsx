import React from "react";
import Nav from "./Nav";
import axios from "axios";
import "./Profile.css";

function Profile() {
  return (
    <div className="profile-page">
      <Nav className="nav-profile" />
      <div className="profile-container">
        <div className="circle-img">1</div>
        <div className="form-profile">
          <div className="input-field-profile">
            <label htmlFor="" className="label-profile">
              Nama
            </label>
            <input type="text" className="input-profile" />
          </div>
          <div className="input-field-profile">
            <label htmlFor="" className="label-prfile">
              Email
            </label>
            <input type="text" className="input-profile" />
          </div>
          <div className="input-field-profile">
            <label className="label-profile">Kata sandi</label>
            <input type="text" className="input-profile" />
          </div>
          <div className="input-field-profile">
            <label htmlFor="" className="label-profle">
              Konfirmasi kata sandi
            </label>
            <input type="text" className="input-profile" />
          </div>
          <div className="btn btn-update-profile">Perbarui sekarang</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
