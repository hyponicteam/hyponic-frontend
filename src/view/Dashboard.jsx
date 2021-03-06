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
import { Modal, Button } from "react-bootstrap";
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
  const [modalHapus, setModalHapus] = useState(false);
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
          // console.log("berhasil ambil api articles : ", res.data.data.data);
          // console.log("berhasil ambil api videos : ", res2.data.data);
        })
      )
      .catch((error) => {
        console.log(error);
      });

    //mengambil list tanaman
    axios.get(BASE_API_URL + "/latest-plants?n=6", config).then((res) => {
      // console.log("berhasil api tanaman", res.data.data);
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
    axios.delete(BASE_API_URL + `/plants/${id}`, config).then((res) => {
      // console.log(res);
      setModalHapus(true);
      window.location.reload();
    });
  };

  return (
    <div className={style.dashboard_container}>
      {/* modal hapus */}
      <Modal show={modalHapus} onHide={() => setModalHapus(false)} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body>
          <h4>Hapus Berhasil</h4>
          <p>Selamat tanaman anda berhasil dihapus</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalHapus(false)}>Kembali</Button>
        </Modal.Footer>
      </Modal>
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
                <div key={item} className={style.list_card}>
                  <div className={style.left_card}>
                    <img className={style.icon_plant} src={plant_icon} alt="" />
                  </div>
                  <div className={style.right_card}>
                    <p className={style.card_title}>{tanaman[item].name}</p>
                    <p className={style.card_date}>{tanaman[item].time_difference}</p>
                    <div className={style.action}>
                      <Link className={style.btn_pantau} to={{ pathname: `/Tanaman/${tanaman[item].id}`, state: { plants: tanaman[item].id, name: tanaman[item].name } }}>
                        Pantau
                      </Link>
                      <Link className={style.icon} to={{ state: { plants: tanaman[item].id, name: tanaman[item].name } }} onClick={() => setModalShow2(true)}>
                        <AiFillEdit />
                      </Link>
                      <button className={style.btn_transparant} onClick={() => DeletePlant(tanaman[item].id)}>
                        <MdDelete />
                      </button>
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
            <Link to="/tutorial" className={style.all}>
              Lihat Semua
            </Link>
          </div>

          <div className={style.article_cards}>
            {Object.keys(articles).map((item, i) => (
              <Link key={item} className={style.link_article} to={{ pathname: `/ReadArticle/${articles[item].id}`, state: { articlesId: articles[item].id } }}>
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
            <Link to="/tutorial" className={style.all}>
              Lihat Semua
            </Link>
          </div>

          <div className={style.article_cards}>
            {Object.keys(videos).map((item, i) => (
              <div key={item} className={style.article_card}>
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
      <Footer />
    </div>
  );
}

export default Dashboard;
