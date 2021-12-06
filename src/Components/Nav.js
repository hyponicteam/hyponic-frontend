import "./style/Nav/nav.css";
import React from "react";
import { useHistory } from "react-router";
import { logout } from "../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
  const history = useHistory();

  const _onLogout = () => {
    logout();
    history.replace("/");
  };
  return (
    <div className="nav">
      <div className="nav-container">
        <div className="logo">
          <img className="logo-icon" src="https://source.unsplash.com/random/50x50" alt="" />
          <h4 className="logo-title">Hyponic</h4>
        </div>

        <ul className="nav-list">
          <li className="nav-list-item underline">
            <Link className="link link-logo link-nav" to={"/Dashboard"}>
              Beranda
            </Link>
          </li>
          <li className="nav-list-item">
            <Link className="link link-logo link-nav" to={"/Tanamanku"}>
              Tanamanku
            </Link>
          </li>
          <li className="nav-list-item">Tutorial</li>
        </ul>

        <div className="profile-nav">
          <img className="notification-icon" src="https://source.unsplash.com/random/30x30" alt="" />
          <Link className="link link-profile" to={"/Profile"}>
            <img className="profile-icon" src="https://source.unsplash.com/random/40x40" alt="" />
          </Link>
          <button onClick={_onLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Nav;
