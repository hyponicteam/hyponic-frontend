import Card_Article from "./Card_Article";
import "./style/Article_Home/article-home.css";

function Article_Home() {
  return (
    <div className="article-home-container">
      <h3 className="article-home-cards-title">Artikel Terbaru</h3>
      <div className="article-home-cards">
        <Card_Article />
        <Card_Article />
        <Card_Article />
        <Card_Article />
        <Card_Article />
        <Card_Article />
      </div>
    </div>
  );
}

export default Article_Home;
