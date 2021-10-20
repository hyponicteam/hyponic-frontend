import React from "react";
import Article_Home from "./Article_Home";
import Header from "./Header";
import Nav from "./Nav";
import Video_Home from "./Video_Home";
import Footer from "./Footer";
import Persiapan from "./Persiapan";
import TipsAndTrick from "./TipsAndTrick";
import Perawatan from "./Perawatan";
import Panen from "./Panen";




const Home = () => {
  return (
    <div>
      <Nav />
      <Header />
      
      <div className="JudulTutorial">
            <h2>Baca artikel seru dengan Hyponic</h2>
        </div>
      <Article_Home />
      <TipsAndTrick/>
      <Persiapan/>
      <Perawatan/>
      <Panen/>
      <Video_Home />
      <Footer />
    </div>
  );
};

export default Tutorial;
