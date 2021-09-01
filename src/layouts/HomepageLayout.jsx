import React from "react";
import Header from "./../components/Header/header";
import Footer from "./../components/Footer/footer";

const HomepageLayout = (props) => {
  return (
    <div>
      <Header {...props} />
      <div className="main">{props.children}</div>
      <Footer />
    </div>
  );
};

export default HomepageLayout;
