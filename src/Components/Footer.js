import "./style/footer/footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-left">
        <p className="footer-left__copyright"> &copy; copyright 2021</p>
      </div>
      <div className="footer-right">
        <p className="footer-right__privacyTerms">Privacy - Terms</p>
      </div>
    </div>
  );
}

export default Footer;
