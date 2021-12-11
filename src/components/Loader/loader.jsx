import React from "react";
import { useSelector } from "react-redux";
import "./loader.scss";

export const Loader = () => {
  const overlay = useSelector((state) => state.uiData.loading);

  if (!overlay) return null;
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </div>
    </div>
  );
};
