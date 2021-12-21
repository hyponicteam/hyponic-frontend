import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { logout } from "../utils/auth";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import style from "./style/NavDashboard.module.css";
import Logo from "../assets/img/logo.png";
import { BASE_API_URL } from "../constants/urls";
function NavDashboard() {
  const history = useHistory();
  const [user, setUser] = useState([]);

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
        console.log(res.data.data);
        setUser(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  console.log(user);

  const _onLogout = () => {
    logout();
    history.replace("/");
  };
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
            <Nav.Link href="/tutorial">Tutorial</Nav.Link>
            <Nav.Link href="/tanamanku">Tanamanku</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title={user.name} id="collasible-nav-dropdown">
              <NavDropdown.Item href="/profil">Pengaturan Profil</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" onClick={_onLogout}>
                Keluar
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavDashboard;
