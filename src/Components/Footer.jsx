import React from "react";
import { Link } from "react-router-dom";
import style from "./style/Footer.module.css";

function Footer() {
  return (
    <div className={style.footer}>
      <div className={style.footer_content}>
        <Link to={"/Dashboard"} className={style.footer_link}>
          Beranda
        </Link>
        <Link to={"/Tutorial"} className={style.footer_link}>
          Tutorial
        </Link>
        <Link to={"/Tanamanku"} className={style.footer_link}>
          Tanamanku
        </Link>
      </div>
      <div className={style.footer_copy}>Hyponic@2021</div>
    </div>
  );
}

export default Footer;
