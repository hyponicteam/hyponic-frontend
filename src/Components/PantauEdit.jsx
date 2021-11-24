import React, { useState } from "react";
import "./pantau.css";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
const qs = require("querystring");
const api = "http://192.168.196.12:8088/api/growths";
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
function PantauEdit(props) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  //inisialisasi state
  const initialState = {
    plant_height: "",
    leaf_width: "",
    temperature: "",
    acidity: "",
    plant_id: "",
    errorMessage: null,
  };

  //bikin data, dan set data
  const [data, setData] = useState(initialState);
  const { state } = useLocation();

  console.log("stateku " + state.state);
  console.log("stateku " + state.plants);

  //handle input change
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  //fungsi ketika form di submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      errorMessage: null,
      plant_id: state.plants,
    });

    //ketika data didapatkan, maka akan merequest body
    const requestBody = {
      plant_height: data.plant_height,
      leaf_width: data.leaf_width,
      temperature: data.temperature,
      acidity: data.acidity,
      plant_id: data.plant_id,
    };

    //konfigurasi header
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      },
    };

    //panggil axios
    axios.patch(api + `/${state.state}`, qs.stringify(requestBody), config).then((res) => {
      if (res.data.meta.code === 200) {
        setData({
          ...data,
        });

        // //redirect ke dashboard - vid2
        // props.history.push("/Login");
        setIsOpen(true);
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

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = "#f00";
  // }

  // function closeModal() {
  //   setShow(false);
  // }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Nav />
      <div>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
          <h3>data pantau anda berhasil ditambahkan</h3>
          <Link onClick={closeModal} style={btnCloseModal} to={{ pathname: `/Tanaman/${state.plants}`, state: { plants: state.plants } }}>
            <button style={btnCloseModal2}>ok</button>
          </Link>
        </Modal>
      </div>
      <div className="pantau-form-container">
        <div className="pantau-form">
          <h2 className="h2-pantau">Edit pantau Tanaman</h2>
          <p className="p-pantau">Masukkan data tanaman perkembangan tanaman anda</p>
          <form className="pantau-form-card" onSubmit={handleFormSubmit}>
            <div className="form-tanam-field">
              <label>plant_height (mm)</label>
              <input value={data.plant_height} type="text" name="plant_height" id="plant_height" className="input-tanam" onChange={handleInputChange} />
            </div>
            <div className="form-tanam-field">
              <label>leaf_width (mm)</label>
              <input value={data.leaf_width} type="text" name="leaf_width" id="leaf_width" className="input-tanam" onChange={handleInputChange} />
            </div>
            <div className="form-tanam-field">
              <label>temperature</label>
              <input value={data.temperature} type="text" name="temperature" id="temperature" className="input-tanam" onChange={handleInputChange} />
            </div>
            <div className="form-tanam-field">
              <label>acidity</label>
              <input value={data.acidity} type="text" name="acidity" id="acidity" className="input-tanam" onChange={handleInputChange} />
            </div>
            <div className="btn-tanam">
              <Link className="link link-pantau-tanam" to={{ pathname: `/Tanaman/${state.plants}`, state: { plants: state.plants } }}>
                Batal
              </Link>
              <button className="link link-pantau-tanam">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PantauEdit;
