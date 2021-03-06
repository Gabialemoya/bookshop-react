import React from "react";
import Header from "./../components/Header/header";
import Footer from "./../components/Footer/footer";

const MainLayout = (props) => {
  return (
    <div className="container">
      <Header {...props} />
      <div className="main">{props.children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
