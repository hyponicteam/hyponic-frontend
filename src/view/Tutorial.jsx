import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavDashboard from "../Components/NavDashboard";
import style from "./style/Tutorial.module.css";
import { BASE_API_URL } from "../constants/urls";
import Footer from "../Components/Footer";
function Tutorial() {
  //inisialisasi varibel
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [openVideo, setOpenVideo] = useState(false);
  const closeVideos = () => {
    setOpenVideo(true);
  };
  const closeArticles = () => {
    setOpenVideo(false);
  };

  useEffect(() => {
    //mengambil data articles dan videos
    axios
      .all([axios.get(BASE_API_URL + "/articles"), axios.get(BASE_API_URL + "/videos")])

      .then(
        axios.spread((res, res2) => {
          setArticles(res.data.data.data);
          setVideos(res2.data.data);
          console.log("berhasil ambil api articles : ", res.data.data.data);
          console.log("berhasil ambil api videos : ", res2.data.data);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={style.main_tutorial}>
      <NavDashboard />

      <div className={style.container_tutorial}>
        {openVideo ? (
          <div className={style.videos_container}>
            <div className={style.btn_chosee}>
              <button className={(style.btn_tutorial, style.btn_active)} onClick={closeVideos}>
                artikel
              </button>
              <button className={style.btn_tutorial} onClick={closeArticles}>
                Video
              </button>
            </div>
            <div className={style.list_article}>
              <div className={style.list_top}>
                <h2 className={style.list_title}>Semua artikel</h2>
              </div>

              <div className={style.article_cards}>
                {Object.keys(articles).map((item, i) => (
                  <Link className={style.link_article} to={{ pathname: `/ReadArticle/${articles[item].id}`, state: { articlesId: articles[item].id } }}>
                    <div className={style.article_card}>
                      <div className={style.header_card}>
                        <img className={style.img_article} src={articles[item].image_url} alt="" />
                      </div>
                      <div className={style.body_card}>
                        <div className={style.tag}>
                          <p className={style.tag_category}>Artikel</p>
                        </div>
                        <p className={style.article_title}>{articles[item].title}</p>
                        <p className={style.article_description}>{articles[item].content.slice(0, 70)}...</p>
                        <p className={style.article_date}>admin {articles[item].updated_at.slice(0, 10)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={style.videos_container}>
            <div className={style.btn_chosee}>
              <button className={style.btn_tutorial} onClick={closeVideos}>
                artikel
              </button>
              <button className={(style.btn_tutorial, style.btn_active)} onClick={closeArticles}>
                Video
              </button>
            </div>
            <div className={style.list_article}>
              <div className={style.list_top}>
                <h2 className={style.list_title}>Semua video</h2>
              </div>

              <div className={style.article_cards}>
                {Object.keys(videos).map((item, i) => (
                  <div className={style.article_card}>
                    <div className={style.header_card}>
                      <iframe className={style.frame_yt} src={`https://www.youtube.com/embed/${videos[item].video_url.slice(17, 28)}`} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen title="video"></iframe>
                    </div>
                    <div className={style.body_card_video}>
                      <div className={style.tag}>
                        <p className={style.tag_category}>Video</p>
                      </div>
                      <p className={style.article_title}>{videos[item].title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Tutorial;
