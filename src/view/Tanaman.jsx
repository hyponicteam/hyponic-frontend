import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Button, Table, Modal } from "react-bootstrap";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

//component
import style from "./style/Tanaman.module.css";
import { BASE_API_URL } from "../constants/urls";
import JumbotronDashboard from "../Components/JumbotronDashboard";
import NavDashboard from "../Components/NavDashboard";
import Footer from "../Components/Footer";
//icon
import { FaLeaf } from "react-icons/fa";
import { GiBrainStem } from "react-icons/gi";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Tanaman() {
  const { state } = useLocation();
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [height, setHeight] = useState([]);
  const [leaf, setLeaf] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [accidity, setAccidity] = useState([]);
  const [topHeight, setTopHeight] = useState([]);
  const [topLeaf, setTopLeaf] = useState([]);
  const [lastPantau, setLastPantau] = useState();
  const [filterSum, setFilterSum] = useState(10000);
  const [growthsLength, setGrowthsLength] = useState();
  const [modalShow, setModalShow] = useState(false);
  var rightNow = new Date();
  var getDate = rightNow.toISOString().slice(0, 10).replace(/-/g, "");
  console.log(getDate);
  var year = getDate.slice(0, 4);
  console.log(year);
  var month = getDate.slice(4, 6);
  console.log(month);
  var day = getDate.slice(6, 8);
  console.log(day);
  var allDate = year + "-" + month + "-" + day;
  console.log(allDate);

  //handle change select
  const handleFilterChange = (e) => {
    setFilterSum(e.target.value);
  };

  console.log("ini adalah nilai filter sum = ", filterSum);
  const filterInt = parseInt(filterSum);
  console.log(typeof filterInt);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      },
    };

    axios.get(BASE_API_URL + `/plants/${state.plants}`, config).then((res) => {
      const responseData = res.data.data.growths;
      console.log("berhasil ambil api", res.data.data);
      setData(responseData);
      console.log(data.length);
      const panjangArrGrowths = res.data.data.growths.length;
      setGrowthsLength(panjangArrGrowths);
      console.log("ini adalah panjang array growths = " + growthsLength);
      console.log(res.data.data.growths.length);
      console.log("ini adalah tanggal " + res.data.data.growths);
      console.log("tipe data length growths = " + typeof growthsLength);
      if (res.data.data.growths.length === 0) {
        setLastPantau(0);
      } else {
        setLastPantau(res.data.data.growths[0].created_at.slice(0, 10));
        console.log("ini adalah last pantau " + lastPantau);
      }
      //ambil tanggal saja dan diset menjadi label
      const x = responseData;
      let labelsDate = [];
      x.forEach((element) => {
        labelsDate.push(element.created_at.slice(0, 10));
      });
      labelsDate.reverse();
      console.log("data tanggal : " + labelsDate);
      setLabels(labelsDate);

      //ambil data chart
      let dataChartHeight = [];
      let dataChartLeaf = [];
      let dataTemperature = [];
      let dataAccidity = [];
      x.forEach((element) => {
        dataChartHeight.push(element.plant_height);
        dataChartLeaf.push(element.leaf_width);
        dataTemperature.push(element.temperature);
        dataAccidity.push(element.acidity);
      });
      dataChartHeight.reverse();
      dataChartLeaf.reverse();
      dataTemperature.reverse();
      dataAccidity.reverse();
      setHeight(dataChartHeight);
      setLeaf(dataChartLeaf);
      setTemperature(dataTemperature);
      setAccidity(dataAccidity);
    });

    //top growths
    axios
      .get(BASE_API_URL + `/top-growths?category=plant_height&n=1&plant_id=${state.plants}`, config)
      .then((res) => {
        console.log(res.data.data);
        setTopHeight(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });

    axios
      .get(BASE_API_URL + `/top-growths?category=leaf_width&n=1&plant_id=${state.plants}`, config)
      .then((res) => {
        console.log(res.data.data);
        setTopLeaf(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const DeletePantau = (id) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      },
    };

    axios.delete(BASE_API_URL + `/growths/${id}`, config).then((res) => {
      setModalShow(true);
      window.location.reload();
    });
  };

  console.log(data);
  console.log(lastPantau);
  console.log(allDate);

  // function isSameDate() {
  //   if (lastPantau === allDate) {
  //     return false;
  //     console.log("jancok");
  //   } else {
  //     return true;
  //     console.log("bangsat");
  //   }
  // }

  return (
    <div className="tanaman_page">
      {/* modal sukses */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body>
          <h4>Hapus Berhasil</h4>
          <p>Selamat data pantauan anda berhasil dihapus</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Kembali</Button>
        </Modal.Footer>
      </Modal>
      <NavDashboard />
      <JumbotronDashboard />
      <div className={style.tanaman_container}>
        <div className={style.title_tanaman}>{state.name}</div>
        {/* insight */}
        <div className={style.insight}>
          <h3 className={style.insight_title}>Insight</h3>
          {topHeight.length !== 0 && topLeaf.length !== 0 ? (
            <div className={style.insight_cards}>
              <div className={style.insight_card}>
                <div className={style.icon_box}>
                  <FaLeaf className={style.icon_insight} />
                </div>
                {Object.keys(topHeight).map((item, i) => (
                  <div className={style.insight_text}>
                    <p className={style.title}>Top Tinggi</p>
                    <p className={style.date}>
                      <span>{topHeight[item].from.slice(0, 10)}</span> ke <span>{topHeight[item].to.slice(0, 10)}</span>
                    </p>
                    <p className={style.rerata}>Pertumbuhan : {topHeight[item].growth_per_day} cm/hari</p>
                  </div>
                ))}
              </div>
              <div className={style.insight_card}>
                <div className={style.icon_box}>
                  <GiBrainStem className={style.icon_insight} />
                </div>
                {Object.keys(topLeaf).map((item, i) => (
                  <div className={style.insight_text}>
                    <p className={style.title}>Top Lebar</p>
                    <p className={style.date}>
                      <span>{topLeaf[item].from.slice(0, 10)}</span> ke <span>{topLeaf[item].to.slice(0, 10)}</span>
                    </p>
                    <p className={style.rerata}>Pertumbuhan : {topLeaf[item].growth_per_day} cm/hari</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            "Belum ada data"
          )}
        </div>

        {/* chart */}
        <div className={style.chart_header}>
          <h2 className={style.chart_title}>Chart Pantau</h2>
          {lastPantau !== allDate ? (
            <Link to={{ pathname: `/Pantau/${state.plants}`, state: { plants: state.plants } }} className={(style.btn, style.btn_pantau)}>
              Pantau
            </Link>
          ) : (
            <button className={(style.btn, style.btn_pantau)}>kembali besok</button>
          )}
        </div>
        <select name="filterDate" id="filterDate" onChange={handleFilterChange} value={filterSum}>
          <option value="10000">semua</option>
          <option value="7">7 Hari yang lalu</option>
          <option value="30">30 Hari yang lalu</option>
          <option value="60">60 hari yang lalu</option>
        </select>
        <div className={style.chart_container}>
          <div className={style.chart}>
            {/* {Object.keys(data).map((n, index) => {
            <Line key={index} data={{}} />;
          })} */}
            <Line
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Tinggi Tanaman",
                  },
                },
              }}
              data={{
                labels: labels.slice(-filterInt),
                datasets: [
                  {
                    label: "Tinggi Tanaman",
                    data: height.slice(-filterInt),
                    borderColor: "#86D4B9",
                    backgroundColor: "#86D4B9",
                  },
                ],
              }}
            />
          </div>
          <div className={style.chart}>
            {/* {Object.keys(data).map((n, index) => {
            <Line key={index} data={{}} />;
          })} */}
            <Line
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Lebar Daun",
                  },
                },
              }}
              data={{
                labels: labels.slice(-filterInt),
                datasets: [
                  {
                    label: "Lebar Daun",
                    data: leaf.slice(-filterInt),
                    borderColor: "#86D4B9",
                    backgroundColor: "#86D4B9",
                  },
                ],
              }}
            />
          </div>
          {/* temperature */}
          <div className={style.chart}>
            <Line
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Temperature",
                  },
                },
              }}
              data={{
                labels: labels.slice(-filterInt),
                datasets: [
                  {
                    label: "Temperature",
                    data: temperature,
                    borderColor: "#86D4B9",
                    backgroundColor: "#86D4B9",
                  },
                ],
              }}
            />
          </div>

          {/* ph */}
          <div className={style.chart}>
            <Line
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "PH Air",
                  },
                },
              }}
              data={{
                labels: labels.slice(-filterInt),
                datasets: [
                  {
                    label: "PH Air",
                    data: accidity.slice(-filterInt),
                    borderColor: "#86D4B9",
                    backgroundColor: "#86D4B9",
                  },
                ],
              }}
            />
          </div>
        </div>
        {/* table */}
        <h2 className={style.title_table}>Tabel pertumbuhan tanaman</h2>

        <div className={style.table}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Tinggi</th>
                <th>Lebar</th>
                <th>Suhu</th>
                <th>Temperature</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data)
                .filter((v) => v < filterInt)
                .map((item, i) => (
                  <tr>
                    <td>
                      <li key={i}>{data[item].created_at}</li>
                    </td>
                    <td>
                      <li key={i}>{data[item].plant_height}</li>
                    </td>
                    <td>
                      <li key={i}>{data[item].leaf_width}</li>
                    </td>
                    <td>
                      <li key={i}>{data[item].temperature}</li>
                    </td>
                    <td>
                      <li key={i}>{data[item].acidity}</li>
                    </td>
                    <td className={style.btn_tanaman_container}>
                      <Link to={{ pathname: `/PantauEdit/${data[item].id}`, state: { state: data[item].id, plants: state.plants } }}>
                        <button className={(style.btn_pantau, style.btn_tanaman)}>UBAH</button>
                      </Link>
                      <button className={(style.btn_pantau, style.btn_delete)} onClick={() => DeletePantau(data[item].id)}>
                        HAPUS
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Footer className={style.footer_tanaman} />
    </div>
  );
}

export default Tanaman;
