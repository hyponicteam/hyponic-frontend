import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//component
import JumbotronDashboard from "../Components/JumbotronDashboard";
import NavDashboard from "../Components/NavDashboard";
import style from "./style/Tanamanku.module.css";
import { BASE_API_URL } from "../constants/urls";
//icon
import { FaLeaf } from "react-icons/fa";
import { GiBrainStem } from "react-icons/gi";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
//images
import plant_icon from "../assets/img/plant_icon.png";
import TambahTanaman from "./TambahTanaman";
import EditTanaman from "./EditTanaman";
import Footer from "../Components/Footer";

function Tanamanku() {
  //inisialisasi varibel
  const [tanaman, setTanaman] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [topHeightPlant, setTopHeightPlant] = useState([]);
  const [topLeafPlant, setTopLeafPlant] = useState([]);
  useEffect(() => {
    //config auth
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      },
    };

    //mengambil list tanaman
    axios.get(BASE_API_URL + "/latest-plants?n=6", config).then((res) => {
      console.log("berhasil api tanaman", res.data.data);
      setTanaman(res.data.data);
    });

    //top growths
    axios.get(BASE_API_URL + `/top-plants?category=plant_height&n=1`, config).then((res) => {
      console.log(res.data.data);
      setTopHeightPlant(res.data.data);
    });

    //top growths
    axios.get(BASE_API_URL + `/top-plants?category=leaf_width&n=1`, config).then((res) => {
      console.log(res.data.data);
      setTopLeafPlant(res.data.data);
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
    <div>
      {/* modal */}
      <TambahTanaman show={modalShow} onHide={() => setModalShow(false)} />
      <EditTanaman show={modalShow2} onHide={() => setModalShow2(false)} />
      {/* component header */}
      <NavDashboard />
      <JumbotronDashboard />
      {/* insight */}
      <div className={style.tanamanku_main_container}>
        <div className={style.insight_tanamanku}>
          <h3 className={style.title_insight}>Insight</h3>
          {topHeightPlant.length !== 0 && topLeafPlant.length !== 0 ? (
            <div className={style.insight_cards}>
              <div className={style.insight_card}>
                <div className={style.icon_box}>
                  <FaLeaf className={style.icon_insight} />
                </div>
                {Object.keys(topHeightPlant).map((item, i) => (
                  <div className={style.insight_text}>
                    <p className={style.title}>Top Tinggi - {topHeightPlant[item].name}</p>
                    <p className={style.date}>
                      <span>{topHeightPlant[item].growth.from.slice(0, 10)}</span> ke <span>{topHeightPlant[item].growth.to.slice(0, 10)}</span>
                    </p>
                    <p className={style.rerata}>Pertumbuhan : {topHeightPlant[item].growth.growth_per_day} cm/hari</p>
                  </div>
                ))}
              </div>
              <div className={style.insight_card}>
                <div className={style.icon_box}>
                  <GiBrainStem className={style.icon_insight} />
                </div>
                {Object.keys(topLeafPlant).map((item, i) => (
                  <div className={style.insight_text}>
                    <p className={style.title}>Top Lebar - {topLeafPlant[item].name}</p>
                    <p className={style.date}>
                      <span>{topLeafPlant[item].growth.from.slice(0, 10)}</span> ke <span>{topLeafPlant[item].growth.to.slice(0, 10)}</span>
                    </p>
                    <p className={style.rerata}>Pertumbuhan : {topLeafPlant[item].growth.growth_per_day} cm/hari</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            "belum ada data"
          )}
        </div>
        {/* list tanaman */}
        <div className={style.list_plant}>
          <div className={style.list_top}>
            <h2 className={style.list_title}>Pantau Tanamanmu</h2>
            <button className={style.all} onClick={() => setModalShow(true)}>
              Tambah Tanaman
            </button>
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
      </div>
      <Footer />
    </div>
  );
}

export default Tanamanku;
