import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import "./Tambah-Tanaman.css";
import Modal from "react-modal";
const api = "http://192.168.196.12:8088/api/plants";
const qs = require("querystring");
Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

const btnCloseModal = {
  color: "white",
  width: "40%",
  marginTop: "10px",
  cursor: "pointer",
  textDecoration: "none",
};

const btnCloseModal2 = {
  color: "white",
  width: "100%",
  display: "block",
  cursor: "pointer",
  border: "none",
  backgroundColor: "#145d45",
  borderRadius: "10px",
  padding: "7px 10px",
};
const EditTanaman = (props) => {
  const initialState = {
    name: "",
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [data, setData] = useState(initialState);
  const { state } = useLocation();
  console.log(state.plants);
  console.log(state.name);

  //handle input change
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  //fungsi ketika form di submit
  const tambahTanaman = (event) => {
    event.preventDefault();
    setData({
      ...data,
      errorMessage: null,
    });
    const requestBody = {
      name: data.name,
    };

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      },
    };

    //panggil axios
    axios.patch(api + `/${state.plants}`, qs.stringify(requestBody), config).then((res) => {
      if (res.data.meta.code === 200) {
        setData({
          ...data,
        });
        setIsOpen(true);
        console.log(res);
      } else {
        setData({
          ...data,
          //mengambil data dari api dan ditampung
          errorMessage: res.meta.message,
        });
      }

      throw res;
    });
  };

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="tambah-tanaman-container">
      <div>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
          <h3>Nama tanaman berhasil diubah</h3>
          <Link onClick={closeModal} style={btnCloseModal} to="/Tanamanku">
            <button style={btnCloseModal2}>ok</button>
          </Link>
        </Modal>
      </div>
      <Nav />
      <div className="tambah-tanaman-card">
        <h1>Tambah tanaman</h1>
        <form className="tambah-tanaman-form" onSubmit={tambahTanaman}>
          <div className="input-form-tambah-tanaman">
            <label className="label-tambah-tanaman" for="name">
              Edit Nama Tanaman : {state.name}
            </label>
            <input onChange={handleInputChange} value={data.name} className="input input-tambah-tanaman" type="text" name="name" id="name" />
          </div>
          <button className="btn-tambah-tanaman">Tambah</button>
        </form>
      </div>
    </div>
  );
};

export default EditTanaman;
