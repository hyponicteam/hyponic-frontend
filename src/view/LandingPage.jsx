// dependency
import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
// style
import style from "./style/LandingPage.module.css";
// component
import NavLP from "../Components/NavLP";
// image
import jumbotronImg from "../assets/img/cont-right.png";
import cardIcon1 from "../assets/img/card-lp.png";
import cardIcon2 from "../assets/img/card-lp2.png";
import cardIcon3 from "../assets/img/card-lp3.png";
import contentiImg1 from "../assets/img/content-img1.png";
import contentiImg2 from "../assets/img/content-img2.png";
import contentiImg3 from "../assets/img/content-img3.png";
import device from "../assets/img/device.png";
import maskur from "../assets/img/maskur.jpg";
import haifa from "../assets/img/haifa.jpeg";
import irgy from "../assets/img/irgy.png";

function LandingPage() {
  return (
    <>
      <NavLP />
      {/* Jumbotron */}
      <div className={style.jumbotron}>
        <div className={style.left_jumbotron}>
          <h1 className={style.title_jumbotron}>Sukseskan Panenmu</h1>
          <p className={style.description_jumbotron}>Hyponic membantu anda untuk memulai dan merawat tanaman hidroponik hingga panen</p>
          <div className={style.cards_jumbotron}>
            <div className={style.card}>
              <img className={style.card_image} src={cardIcon1} alt="" />
              <h2 className={style.card_title}>Pantau tanaman</h2>
            </div>
            <div className={style.card}>
              <img className={style.card_image} src={cardIcon3} alt="" />
              <h2 className={style.card_title}>Insight tanaman</h2>
            </div>
            <div className={style.card}>
              <img className={style.card_image} src={cardIcon2} alt="" />
              <h2 className={style.card_title}>Tutorial Tanaman</h2>
            </div>
          </div>
        </div>
        <div className={style.right_jumbotron}>
          <img className={style.jumbotron_img} src={jumbotronImg} alt="" />
        </div>
      </div>
      {/* Content */}
      <div className={style.main_content}>
        <div className={style.content}>
          <div className={style.content_left}>
            <h2 className={style.content_title}>Pantau Tanamanmu</h2>
            <p className={style.content_description}>
              Anda bisa memantau tanaman hidroponik dengan hyponic. Fitur ini akan memudahkan anda memantau tanaman anda, karena dengan chart pantau yang menampilkan chart tinggi tanaman, lebar daun tanaman, suhu udara, dan ph air.
            </p>
          </div>
          <div className={style.content_right}>
            <img className={style.content_img} src={contentiImg1} alt="" />
          </div>
        </div>
        <div className={style.content}>
          <div className={style.content_right}>
            <img className={style.content_img} src={contentiImg2} alt="" />
          </div>
          <div className={style.content_left}>
            <h2 className={style.content_title}>Pantau Tanamanmu</h2>
            <p className={style.content_description}>
              Anda bisa memantau tanaman hidroponik dengan hyponic. Fitur ini akan memudahkan anda memantau tanaman anda, karena dengan chart pantau yang menampilkan chart tinggi tanaman, lebar daun tanaman, suhu udara, dan ph air.
            </p>
          </div>
        </div>
        <div className={style.content}>
          <div className={style.content_left}>
            <h2 className={style.content_title}>Pantau Tanamanmu</h2>
            <p className={style.content_description}>
              Anda bisa memantau tanaman hidroponik dengan hyponic. Fitur ini akan memudahkan anda memantau tanaman anda, karena dengan chart pantau yang menampilkan chart tinggi tanaman, lebar daun tanaman, suhu udara, dan ph air.
            </p>
          </div>
          <div className={style.content_right}>
            <img className={style.content_img} src={contentiImg3} alt="" />
          </div>
        </div>
      </div>

      {/* testimonial */}
      <div className={style.testimonial}>
        <h2 className={style.top_testimonial}>Apa kata mereka!</h2>
        <div className={style.cards_testimonial}>
          <div className={style.card_testimonial}>
            <p className={style.description_testimonial}>“Hyponic membantu saya dalam menyukseskan tanaman hidroponik saya. terimakasih hyponic.”</p>
            <img className={style.picture_testimonial} src={maskur} alt="" />
            <h4 className={style.name_testimonial}>Maskurnia shidi</h4>
            <h5 className={style.job_testimonial}>Mahasiswa</h5>
          </div>
          <div className={style.card_testimonial}>
            <p className={style.description_testimonial}>“Dengan hyponic sangat membantu saya dalam mananam tanaman hidroponik. dengan fitur insight membantu saya dalam mengambil keputusan.”</p>
            <img className={style.picture_testimonial} src={irgy} alt="" />
            <h4 className={style.name_testimonial}>Stefanus Irgy Hananto</h4>
            <h5 className={style.job_testimonial}>Mahasiswa</h5>
          </div>
          <div className={style.card_testimonial}>
            <p className={style.description_testimonial}>“Terimakasih hyponic!Dengan hyponic dapat membantu saya dalam memantau tanaman hidroponik saya. hyponic luar biasa. terimakasih”</p>
            <img className={style.picture_testimonial} src={haifa} alt="" />
            <h4 className={style.name_testimonial}>Haifa Mandalika</h4>
            <h5 className={style.job_testimonial}>Mahasiswa</h5>
          </div>
        </div>
      </div>

      {/* get on playstore */}
      <div className={style.get_ps}>
        <h2 className={style.top_get_ps}>Cobain Hyponic Sekarang!</h2>
        <img src={device} alt="laptop" className={style.device} />
        <img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png?hl=id" alt="" className={style.get_img} />
      </div>

      {/* footer */}
      <div className={style.footer_lp}>
        <p className={style.copyright_lp}>&copy; Hyponic 2021</p>
      </div>
    </>
  );
}

export default LandingPage;
