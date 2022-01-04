import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

//component
import { BASE_API_URL } from "../constants/urls";
// import style from "./style/TambahTanaman.module.css";

function TambahTanaman(props) {
  const initialState = {
    name: "",
  };
  const [data, setData] = useState(initialState);
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
    //ngga usah cek 200
    axios.post(BASE_API_URL + "/plants", requestBody, config).then((res) => {
      if (res.data.meta.code === 200) {
        setData({
          ...data,
        });
        // console.log(res);
        window.location.reload();
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

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Tambah Tanaman</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Silahkan masukkan nama tanaman yang ingin anda pantau perkembangannya!</p>
        <Form onSubmit={tambahTanaman}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nama Tanaman : </Form.Label>
            <Form.Control type="text" placeholder="bayam,sawi,dll" onChange={handleInputChange} value={data.name} name="name" />
          </Form.Group>
          <Modal.Footer>
            <Button type="submit">Simpan</Button>
            <Button onClick={props.onHide}>Batal</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default TambahTanaman;
