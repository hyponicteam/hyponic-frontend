import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Header from "./Header";
import Chart from "./Chart";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import "./tanaman.css";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const api = "http://192.168.196.12:8088/api/plants";
const api2 = "http://192.168.196.12:8088/api/top-plants?category=leaf_width&n=1";
const qs = require("querystring");
const Tanaman = (_) => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const { state } = useLocation();
  console.log("data tanamanku tanam : " + state.plants);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      },
    };
    axios.get(api + `/${state.plants}`, config).then((res) => {
      console.log("berhasil ambil api", res.data.data);
      const responseData = res.data.data.growths;
      setData(responseData);
      console.log(data);
      const x = responseData;
      let chartData = [];
      x.forEach((element) => {
        chartData.push({
          labels: element.created_at,
          datasets: [{ data: element.plant_height }],
        });
      });
      setChartData({ chartData });
      console.log("chart data : " + chartData);
      console.log(chartData);
    });
    axios
      .get(api2, config)
      .then((res) => {
        console.log("berhasil ambil top growts", res);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  console.log("dataku : " + data);
  const DeletePantau = (id) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      },
    };
    axios.delete(`http://192.168.196.12:8088/api/growths/${id}`, config).then((res) => {
      console.log(res);
      alert("berhasil ngehapus");
      window.location.reload();
    });
  };
  return (
    <div className="tanaman-main">
      <Nav />
      <div className="content-tanaman">
        <div className="tanaman-list">
          <h3 className="tanaman-title">Pertumbuhan Tercepat</h3>
          <table className="styled-table">
            <thead>
              <tr>
                <td>from</td>
                <td>to</td>
                <td>Rata-rata pertumbuhan tinggi</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10 mm/hari</td>
                <td>2 mm/hari</td>
                <td>7</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="tanaman-list">
          <h3>Insight Tanamanku</h3>
          <table class="styled-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Tinggi Tanaman</th>
                <th>Lebar Daun</th>
                <th>Suhu Udara</th>
                <th>Ph air</th>
                <th style={{ paddingLeft: "100px" }}>Aksi</th>
              </tr>
            </thead>
            {Object.keys(data).map((item, i) => (
              <tbody>
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
                  <td>
                    <Link to={{ pathname: `/PantauEdit/${data[item].id}`, state: { state: data[item].id, plants: state.plants } }}>
                      <button className="btn-pantau btn-pantau-1">edit</button>
                    </Link>
                    <button className="btn-pantau btn-pantau-1" onClick={() => DeletePantau(data[item].id)}>
                      hapus
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <Chart />
        <div className="chart">
          {Object.keys(chartData).map((n, index) => {
            <Line key={index} data={n} />;
          })}
        </div>
        <Link className="link link-pantau" to={{ pathname: `/Pantau/${state.plants}`, state: { plants: state.plants } }}>
          Pantau
        </Link>
      </div>
    </div>
  );
};

export default Tanaman;
