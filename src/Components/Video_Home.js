// import Card_Article from "./Card_Article";
import Videos from "./class/Videos";
import "./style/Video_Home/video-home.css";

function Video_Home() {
  return (
    <div className="video-home-container">
      <h3 className="video-home-cards-title">Video Terbaru</h3>
      <div className="video-home-cards">
        {/* <Card_Article />
        <Card_Article />
        <Card_Article />
        <Card_Article />
        <Card_Article />
        <Card_Article /> */}
        <Videos />
      </div>
    </div>
  );
}

export default Video_Home;
