import "./style/Daily_Home/daily_home.css";
import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { config } from "process";
import Tanaman from "./Tanaman";
const api = "http://192.168.196.12:8088/api/plants";
const qs = require("querystring");

class Daily_Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      response: "",
    };
  }

  componentDidMount() {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      },
    };
    axios.get(api, config).then((res) => {
      console.log("berhasil ambil api", res);
      this.setState({
        plants: res.data.data,
      });
    });

    axios.delete(api, config).then((res) => {
      console.log(res);
    });
  }

  deletePlant(id) {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      },
    };
    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer " + localStorage.getItem("TOKEN"));

    // var requestOptions = {
    //   method: "DELETE",
    //   headers: myHeaders,
    //   redirect: "follow",
    // };

    // fetch("/plants/05411b26-3922-4e4b-8b18-067828f447b6", requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log("error", error));

    axios.delete(`http://192.168.196.12:8088/api/plants/${id}`, config).then((res) => {
      console.log(res);
      alert("berhasil ngehapus");
    });
  }
  render() {
    return (
      <div className="daily-home-container">
        <h3 className="daily-home-cards-title">Terakhir diubah</h3>
        <div className="daily-home-cards">
          <div className="table-plant">
            <div className="table-head">
              <h3>Terakhir diubah</h3>
            </div>
            {this.state.plants.map((plants) => (
              <div className="table-content">
                <h3>{plants.name}</h3>
                <Link className="btn-pantau-1" type="submit" to={{ pathname: `/Tanaman/${plants.id}`, state: { plants: plants.id } }}>
                  Pantau
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Daily_Home;
