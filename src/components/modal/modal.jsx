import { useEffect } from "react";
import { createPortal } from "react-dom";

import styles from "./modal.module.css";

import { PORTAL_ROOT } from "../../utils/constants";

import ModalOverlay from "./modal-overlay/modal-overlay";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Modal({ children }) {
  const navigate = useNavigate();

  const closeByEscape = (e) => {
    if (e.key === "Escape") {
      navigate(-1);
    }
  };

  /* eslint-disable */
  useEffect(() => {
    document.addEventListener("keydown", closeByEscape);

    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []); // no deps cuz for set event need one mount
  /* eslint-enable */

  return createPortal(
    <section className={styles.modal}>
      <div className={`${styles.inner}`}>
        <div className={`${styles.close} mt-15 mr-10`}>
          <CloseIcon onClick={() => navigate(-1)} type="primary" />
        </div>

        {children}
      </div>
      <ModalOverlay />
    </section>,
    PORTAL_ROOT
  );
}

export default Modal;
