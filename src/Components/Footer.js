import "./style/Footer/footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-top">
        <h3 className="footer-top__title">Tanam tanaman hidroponikmu</h3>
        <p className="footer-top__description">Dengan Hyponic, menanam tanaman hidroponik menjadi mudah</p>
      </div>
      <hr className="footer-breakLine"></hr>
      <div className="footer-bottom">
        <div className="footer-bottom-nav">
          <ul className="footer-bottom-nav__list">
            <li className="footer-list">Kebijakan Privasi</li>
            <li className="footer-list">Tentang Kami</li>
            <li className="footer-list">Hubungi Kami</li>
          </ul>
          <p className="footer-bottom-nav__language">Bahasa Indonesia</p>
        </div>
        <div className="footer-bottom-copyright">
          <h3 className="footer-bottom-copyright__logo">Hyponic</h3>
          <p className="footer-bottom-copyright__copy">2021 - Hyponic</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
