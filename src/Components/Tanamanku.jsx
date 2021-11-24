import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { config } from "process";
import Tanaman from "./Tanaman";
import "./Tanamanku.css";
const api = "http://192.168.196.12:8088/api/plants";
const qs = require("querystring");
class Tanamanku extends React.Component {
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
      <div>
        <Nav />
        <Header />
        <div className="daily-home-container">
          <div className="tanamanku-top-header">
            <h3 className="daily-home-cards-title">Daftar Tanamanku</h3>
            <Link className="tambah-tanaman btn-pantau-1" to="/TambahTanaman">
              tambah
            </Link>
          </div>
          <div className="daily-home-cards">
            <div className="table-plant">
              <div className="table-head">
                <h3>Terakhir diubah</h3>
                <h3 style={{ marginRight: "150px" }}>Aksi</h3>
              </div>

              {this.state.plants.map((plants) => (
                <div className="table-content">
                  <h3 className="list-tanamanku">{plants.name}</h3>
                  <div className="btn-collect">
                    <button className="btn-pantau btn-pantau-1" type="submit">
                      <Link className="link link-logo btn-pantau-2" to={{ pathname: `/Tanaman/${plants.id}`, state: { plants: plants.id } }}>
                        Pantau
                      </Link>
                    </button>
                    <button className="btn-pantau btn-pantau-1" type="submit">
                      <Link className="link link-logo btn-pantau-2" to={{ pathname: `/EditTanaman/${plants.id}`, state: { plants: plants.id, name: plants.name } }}>
                        Edit
                      </Link>
                    </button>
                    <button className="btn-pantau btn-pantau-1" type="submit" onClick={() => this.deletePlant(plants.id)}>
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tanamanku;
