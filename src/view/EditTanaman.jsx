import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
//dependency
// import style from "./style/TambahTanaman.module.css";
import { BASE_API_URL } from "../constants/urls";

function EditTanaman(props) {
  const initialState = {
    name: "",
  };
  const [data, setData] = useState(initialState);
  const { state } = useLocation();

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
    axios.patch(BASE_API_URL + `/plants/${state.plants}`, requestBody, config).then((res) => {
      if (res.data.meta.code === 200) {
        setData({
          ...data,
        });
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
        <Modal.Title id="contained-modal-title-vcenter">Ubah Tanaman</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Silahkan ubah nama tanaman yang ingin anda pantau perkembangannya!</p>
        <Form onSubmit={tambahTanaman}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Ubah nama tanaman : </Form.Label>
            <Form.Control type="text" onChange={handleInputChange} value={data.name} name="name" />
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

export default EditTanaman;
