import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import style from "./modal.module.css";

import { PORTAL_ROOT } from "../../utils/constants";
import cross from "../../images/modal-cross-close-icon.svg";

import ModalOverlay from "./modal-overlay/modal-overlay";

function Modal({ children, close }) {
  const closeByEscape = (e) => {
    if (e.key === "Escape") {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closeByEscape);

    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []);

  return createPortal(
    <section className={style.modal}>
      <div className={style.inner}>
        <img
          src={cross}
          alt="Закрыть"
          className={`${style.close} mt-15 mr-10`}
          onClick={close}
        />
        {children}
      </div>
      <ModalOverlay onClose={() => close()} />
    </section>,
    PORTAL_ROOT
  );
}

Modal.propsType = {
  close: PropTypes.func.isRequired,
};

export default Modal;
