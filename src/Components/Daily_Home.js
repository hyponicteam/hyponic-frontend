import "./style/Daily_Home/daily_home.css";
import Card from "./Card_Plant";

function Daily_Home() {
  return (
    <div className="daily-home-container">
      <h3 className="daily-home-cards-title">Selesaikan daily activitymu</h3>
      <div className="daily-home-cards">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default Daily_Home;
