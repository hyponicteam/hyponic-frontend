import React, { useContext } from "react";
import Article_Home from "./Article_Home";
import Daily_Home from "./Daily_Home";
import Header from "./Header";
import Nav from "./Nav";
import Video_Home from "./Video_Home";
import Footer from "./Footer";
import { Redirect } from "react-router";

const Home = () => {
  return (
    <div>
      <Nav />
      <Header />
      <Daily_Home />
      <Article_Home />
      <Video_Home />
      <Footer />
    </div>
  );
};

export default Home;
