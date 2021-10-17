import "./style/Nav/nav.css";
import React from "react";
import { useHistory } from "react-router";
import { logout } from "../utils/auth";

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
          <li className="nav-list-item underline">Home</li>
          <li className="nav-list-item">Daily Activity</li>
          <li className="nav-list-item">Tutorial</li>
        </ul>

        <div className="profile-nav">
          <img className="notification-icon" src="https://source.unsplash.com/random/30x30" alt="" />
          <img className="profile-icon" src="https://source.unsplash.com/random/40x40" alt="" />
          <button onClick={_onLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Nav;