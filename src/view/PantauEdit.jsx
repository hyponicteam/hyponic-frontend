import React, { useState } from "react";
import NavDashboard from "../Components/NavDashboard";
import { Button, Modal } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL } from "../constants/urls";
import "./style/PantauEdit.css";

function PantauEdit() {
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
  const [modalShow, setModalShow] = useState(false);
  const { state } = useLocation();

  console.log("stateku " + state.state);
  console.log("stateku " + state.plants);

  // //useeffect get api
  // useEffect(() => {
  //   const config = {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("TOKEN"),
  //     },
  //   };
  // }, []);

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
    axios.patch(BASE_API_URL + `/growths/${state.state}`, requestBody, config).then((res) => {
      if (res.data.meta.code === 200) {
        setData({
          ...data,
        });
        setModalShow(true);
      } else {
        setData({
          ...data,
          errorMessage: res.meta.message,
        });
      }

      throw res;
    });
  };
  return (
    <div>
      {/* modal */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body>
          <h4>Pantau Berhasil</h4>
          <p>Selamat data pantauan anda berhasil diubah</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>
            <Link className="btn_back" to={{ pathname: `/Tanaman/${state.plants}`, state: { plants: state.plants } }}>
              Kembali
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>
      <NavDashboard />
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
    </div>
  );
}

export default PantauEdit;
