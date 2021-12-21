import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import style from "./style/NavLP.module.css";
import Logo from "../assets/img/logo.png";

function NavLP() {
  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" className={style.navbar}>
      <Container className={style.container_navbar}>
        <Navbar.Brand href="/" className={style.navbar_brand}>
          <img src={Logo} alt="" width="50px" height="auto" className={style.logo} />
          Hyponic
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className={style.text}>
              Beranda
            </Nav.Link>
            {/* <Nav.Link href="/tutorial">Tutorial</Nav.Link> */}
          </Nav>
          <Nav>
            <Nav.Link href="/register" className={style.register_button}>
              Daftar
            </Nav.Link>
            <Nav.Link eventKey={2} href="/login" className={style.login_button}>
              Masuk
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavLP;
