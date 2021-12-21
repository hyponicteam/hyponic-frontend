// dependency
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// Component
import style from "./style/Dashboard.module.css";
import NavDashboard from "../Components/NavDashboard";
import JumbotronDashboard from "../Components/JumbotronDashboard";
import { BASE_API_URL } from "../constants/urls";
import EditTanaman from "./EditTanaman";
//icon
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
//images
import plant_icon from "../assets/img/plant_icon.png";
import Footer from "../Components/Footer";

function Dashboard() {
  //inisialisasi varibel
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [tanaman, setTanaman] = useState([]);
  const [modalShow2, setModalShow2] = useState(false);
  useEffect(() => {
    //config auth
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      },
    };
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

    //mengambil list tanaman
    axios.get(BASE_API_URL + "/latest-plants?n=6", config).then((res) => {
      console.log("berhasil api tanaman", res.data.data);
      setTanaman(res.data.data);
    });
  }, []);

  //delete tanaman
  const DeletePlant = (id) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      },
    };
    axios.delete(`http://18.221.184.74:8088/api/plants/${id}`, config).then((res) => {
      console.log(res);
      alert("berhasil ngehapus");
      window.location.reload();
    });
  };

  return (
    <div className={style.dashboard_container}>
      <EditTanaman show={modalShow2} onHide={() => setModalShow2(false)} />
      <NavDashboard />
      <JumbotronDashboard />
      <div className={style.content}>
        {/* 3 List tanaman */}
        <div className={style.list_plant}>
          <div className={style.list_top}>
            <h2 className={style.list_title}>Pantau Tanamanmu</h2>
            <Link to="/tanamanku" className={style.all}>
              Lihat Semua
            </Link>
          </div>
          {/* content tanaman */}
          {tanaman.length !== 0 ? (
            <div className={style.list_content}>
              {Object.keys(tanaman).map((item, i) => (
                <div className={style.list_card}>
                  <div className={style.left_card}>
                    <img className={style.icon_plant} src={plant_icon} alt="" />
                  </div>
                  <div className={style.right_card}>
                    <p className={style.card_title}>{tanaman[item].name}</p>
                    <p className={style.card_date}>{tanaman[item].time_difference}</p>
                    <div className={style.action}>
                      <Link className={style.btn_pantau}>Pantau</Link>
                      <Link className={style.icon} to={{ state: { plants: tanaman[item].id, name: tanaman[item].name } }} onClick={() => setModalShow2(true)}>
                        <AiFillEdit />
                      </Link>
                      <Link className={style.icon}>
                        <button className={style.btn_transparant} onClick={() => DeletePlant(tanaman[item].id)}>
                          <MdDelete />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            "Belum ada data"
          )}
        </div>
        {/* 6 artikel terbaru */}
        <div className={style.list_article}>
          <div className={style.list_top}>
            <h2 className={style.list_title}>Artikel Terbaru</h2>
            <Link className={style.all}>Lihat Semua</Link>
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
        {/* 6 video terbaru */}
        <div className={style.list_article}>
          <div className={style.list_top}>
            <h2 className={style.list_title}>Video Terbaru</h2>
            <Link className={style.all}>Lihat Semua</Link>
          </div>

          <div className={style.article_cards}>
            {Object.keys(videos).map((item, i) => (
              <div className={style.article_card}>
                <div className={style.header_card}>
                  <img className={style.img_article} src={videos[item].video_category.image_url} alt="" />
                </div>
                <div className={style.body_card}>
                  <div className={style.tag}>
                    <p className={style.tag_category}>videos</p>
                  </div>
                  <p className={style.article_title}>{videos[item].title}</p>
                  <p className={style.article_date}>admin {videos[item].updated_at.slice(0, 10)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
