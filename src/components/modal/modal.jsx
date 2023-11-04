import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ModalOverlay from "./modal-overlay/modal-overlay";

import style from "./modal.module.css";
import cross from "../../images/modal-cross-close-icon.svg";

function Modal({ children, closeModal }) {
  const _close = () => {
    closeModal();
  };

  const closeByEscape = (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closeByEscape);

    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []);

  return (
    <ModalOverlay>
      <div className={style.modal}>
        <img
          src={cross}
          alt="Закрыть"
          className={`${style.close} mt-15 mr-10`}
          onClick={_close}
        />
        {children}
      </div>
    </ModalOverlay>
  );
}

Modal.propsType = {
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
