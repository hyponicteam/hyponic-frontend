import React from "react";
import style from "./style/daily_home.css";
import Card from "./Card_Plant";

function Daily_Home() {
  return (
    <div className={style.daily_home}>
      <div className={style.container}>      
          <h4 className={style.itle}>Selesaikan daily activitymu</h4>
        </div>
        <div className="daily-home-cards">
        <Card />
        <Card />
        <Card />
        </div>
        <div className="daily-home-cards">
        <Card />
        <Card />
        <Card />
        </div>
      </div>
  );
}
