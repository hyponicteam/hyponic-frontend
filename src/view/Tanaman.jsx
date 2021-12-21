import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Table } from "react-bootstrap";
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
      setHeight(dataChartHeight);
      setLeaf(dataChartLeaf);
      setTemperature(dataTemperature);
      setAccidity(dataAccidity);
    });

    //top growths
    axios
      .get(BASE_API_URL + `/top-growths?category=plant_height&n=2&plant_id=${state.plants}`, config)
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
      alert("berhasil ngehapus");
      window.location.reload();
    });
  };

  return (
    <div className="tanaman_page">
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
          <Link to={{ pathname: `/Pantau/${state.plants}`, state: { plants: state.plants } }} className={(style.btn, style.btn_pantau)}>
            Pantau
          </Link>
        </div>
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
                labels: labels,
                datasets: [
                  {
                    label: "Tinggi Tanaman",
                    data: height,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
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
                labels: labels,
                datasets: [
                  {
                    label: "Lebar Daun",
                    data: leaf,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
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
                labels: labels,
                datasets: [
                  {
                    label: "Temperature",
                    data: temperature,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
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
                labels: labels,
                datasets: [
                  {
                    label: "PH Air",
                    data: accidity,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
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
                <th>Temperature</th>
                <th>Suhu</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((item, i) => (
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
