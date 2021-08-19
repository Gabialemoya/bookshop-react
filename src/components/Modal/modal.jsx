import React from "react";
import "./modal.scss";

const Modal = ({ hideModal, toggleModal, handleClean, children }) => {
  if (hideModal) return null;

  return (
    <>
      <div
        className="modalOverlay"
        onClick={() => {
          toggleModal();
          handleClean();
        }}
      />
      <div className="modalWrap">
        <div className="modal">{children}</div>
      </div>
    </>
  );
};

export default Modal;
