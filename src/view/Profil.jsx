// dependency
import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
//komponen
import style from "./style/profil.module.css";
import { BASE_API_URL } from "../constants/urls";
import NavDashboard from "../Components/NavDashboard";
import PROFILE_DEFAULT from "../assets/img/profile-default.png";

//handle ibnbput change

function Profil() {
  const [profil, setProfil] = useState("");
  //config auth

  const handleInputChange = (event) => {
    setProfil({
      profil,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      },
    };
    setProfil(profil);

    //requesst body
    const requestBody = {
      name: profil.name,
      email: profil.email,
    };

    //panggil axios
    axios
      .patch(BASE_API_URL + "/user", requestBody, config)
      .then((res) => {
        setProfil(profil);
        alert("Ganti profil berhasil");
      })
      .catch((res) => {
        console.log("tidak berhasil" + res);
      });
  };

  useEffect(() => {
    //config auth
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      },
    };

    axios
      .get(BASE_API_URL + `/user`, config)
      .then((res) => {
        setProfil(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  return (
    <div className={style.profile_container}>
      <NavDashboard />
      <div className={style.profil_card}>
        <div className={style.profil_left}>
          <div className={style.list_left}>Profile</div>
        </div>
        <div className={style.profil_right}>
          <h2 className={style.profil_title}>Pengaturan Profil</h2>
          <div className={style.picture}>
            <img src={PROFILE_DEFAULT} alt="user profil" className={style.picture_profile} />
          </div>
          <label htmlFor="avatar" className="btn">
            Ganti Profil
          </label>
          <input className={style.input_image} type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
          <Form onSubmit={handleFormSubmit} className={style.form_profil}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nama</Form.Label>
              <Form.Control type="text" name="name" value={profil.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={profil.email} onChange={handleInputChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Ubah
            </Button>
          </Form>
          <img src={profil.profile_picture} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Profil;
