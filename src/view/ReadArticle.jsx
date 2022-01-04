import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL } from "../constants/urls";
//component
import style from "./style/ReadArticle.module.css";
import NavDashboard from "../Components/NavDashboard";

function ReadArticle() {
  const { state } = useLocation();
  const [articles, setArticles] = useState([]);
  console.log(state.articlesId);
  useEffect(() => {
    axios.get(BASE_API_URL + `/articles/${state.articlesId}`).then((res) => {
      // console.log("api artikel = " + res.data.data);
      setArticles(res.data.data);
    });
  }, []);
  return (
    <div className={style.main_container}>
      <NavDashboard />
      <div className={style.ReadArticle_container}>
        <div className={style.article_content}>
          <h2 className={style.article_title}>{articles.title}</h2>
          {/* <p className={style.article_date}>
            {articles.user.name} - {articles.updated_at.slice(0, 10)}
          </p> */}
          <div className={style.article_image_container}>
            <img className={style.article_image} src={articles.image_url} alt="" />
          </div>
          <p className={style.article_content}>{articles.content}</p>
        </div>
      </div>
    </div>
  );
}

export default ReadArticle;
