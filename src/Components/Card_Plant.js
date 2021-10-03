import "./style/Card_Plant/card-plant.css";

function Card_Plant() {
  return (
    <div className="card-plant">
      <img src="https://source.unsplash.com/random/100x100" alt="" className="card-plant-icon" />
      <h3 className="card-plant-title">Bayam</h3>
      <p className="card-plant-dailyTitle">Menanam bayam dikebun untuk dimakan dadang</p>
      <p className="card-plant-progressBar">progress : 67%</p>
      <a className="card-plant-button">Lanjutkan</a>
    </div>
  );
}

export default Card_Plant;
