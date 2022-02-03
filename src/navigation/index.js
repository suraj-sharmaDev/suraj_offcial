import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { connect } from "react-redux";

import SideBar from "components/navigation/Sidebar";
import Home from "pages/Home";
import OurWorks from "pages/OurWorks";
import AboutUs from "pages/AboutUs";
import ContactUs from "pages/ContactUs";
import Game from "pages/Game";

const Navigation = (props) => {
  return (
    <Router>
      <SideBar>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/aboutUs" exact element={<AboutUs />} />
          <Route path="/ourWorks" exact element={<OurWorks />} />
          <Route path="/contactUs" exact element={<ContactUs />} />
          <Route path="/game" exact element={<Game />} />          
        </Routes>
      </SideBar>
    </Router>
  );
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
