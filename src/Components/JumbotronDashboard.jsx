import React from "react";
import style from "./style/JumbotronDashboard.module.css";

// image
import jumbotronImg from "../assets/img/cont-right.png";
import cardIcon1 from "../assets/img/card-lp.png";
import cardIcon2 from "../assets/img/card-lp2.png";
import cardIcon3 from "../assets/img/card-lp3.png";
function JumbotronDashboard() {
  return (
    <div>
      <div className={style.jumbotron}>
        <div className={style.left_jumbotron}>
          <h1 className={style.title_jumbotron}>Sukseskan Panenmu</h1>
          <p className={style.description_jumbotron}>Hyponic membantu anda untuk memulai dan merawat tanaman hidroponik hingga panen</p>
          <div className={style.cards_jumbotron}>
            <div className={style.card}>
              <img className={style.card_image} src={cardIcon1} alt="" />
              <h2 className={style.card_title}>Pantau tanaman</h2>
            </div>
            <div className={style.card}>
              <img className={style.card_image} src={cardIcon3} alt="" />
              <h2 className={style.card_title}>Insight tanaman</h2>
            </div>
            <div className={style.card}>
              <img className={style.card_image} src={cardIcon2} alt="" />
              <h2 className={style.card_title}>Tutorial Tanaman</h2>
            </div>
          </div>
        </div>
        <div className={style.right_jumbotron}>
          <img className={style.jumbotron_img} src={jumbotronImg} alt="" />
        </div>
      </div>
    </div>
  );
}

export default JumbotronDashboard;
