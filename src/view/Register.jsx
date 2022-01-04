import { useState } from "react";
import style from "./style/Register.module.css";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_API_URL } from "../constants/urls";
import axios from "axios";
import Logo from "../assets/img/logo.png";

function Register() {
  //inisialisasi state
  const initialState = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    errorMessage: null,
  };
  //set  data
  const [data, setData] = useState(initialState);
  const [modalShow, setModalShow] = useState(false);
  const [failedRegister, setFailedRegister] = useState(false);
  //handle ibnbput change
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  //fungsi ketika form disubmit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      errorMessage: null,
    });

    //requesst body
    const requestBody = {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    };

    //panggil axios
    axios
      .post(BASE_API_URL + "/auth/register", requestBody)
      .then((res) => {
        setData({ ...data });
        setModalShow(true);
      })
      .catch((res) => {
        setFailedRegister(true);
        // console.log("tidak berhasil" + res);
      });
  };

  return (
    <>
      {/* modal sukses */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body>
          <h4>Pendaftaran Berhasil</h4>
          <p>Selamat Pendaftaran anda telah berhasil, silahkan Masuk!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>
            <Link className="btn_back" to={"/Login"}>
              Masuk
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={failedRegister} onHide={() => setFailedRegister(false)} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body>
          <h4>Pendaftaran Gagal</h4>
          <p>Mohon maaf, pendaftaran anda gagal silahkan mencoba kembali</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setFailedRegister(false)}></Button>
        </Modal.Footer>
      </Modal>
      <div className={style.register_container}>
        <div className={style.left_container}>
          <img src={Logo} alt="" className={style.brand_logo} />
          <p className={style.brand_text}>Hyponic</p>
          <h2 className={style.heading_left}>Daftar Sekarang</h2>
          <p className={style.left_description}>Masuk Hyponic sekarang juga untuk mendapatkan hasil panen tanaman hidroponik yang memuaskan</p>
          <Link className={style.btn_register} to={"/Login"}>
            Masuk
          </Link>
        </div>
        <div className={style.right_container}>
          <div className={style.login_form}>
            <h2 className={style.login_title}>Daftar Akun</h2>
            <form className={style.login_container_form} onSubmit={handleFormSubmit}>
              <div className={style.input_form_container}>
                <label htmlFor="name" className={style.label_form}>
                  Nama
                </label>
                <input required type="text" className={style.input_form} name="name" onChange={handleInputChange} value={data.name} />
              </div>
              <div className={style.input_form_container}>
                <label htmlFor="email" className={style.label_form}>
                  Email
                </label>
                <input required type="email" className={style.input_form} name="email" onChange={handleInputChange} value={data.email} />
              </div>
              <div className={style.input_form_container}>
                <label htmlFor="password" className={style.label_form}>
                  Kata Sandi
                </label>
                <input required type="password" className={style.input_form} name="password" onChange={handleInputChange} value={data.password} />
              </div>
              <div className={style.input_form_container}>
                <label htmlFor="password" className={style.label_form}>
                  Konfirmasi Kata Sandi
                </label>
                <input required type="password" className={style.input_form} name="password_confirmation" onChange={handleInputChange} value={data.password_confirmation} />
              </div>
              <button className={(style.btn, style.btn_gabung)}>Gabung Sekarang</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
