import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { setOpened } from "../../services/modalSlice";

import styles from "./modal.module.css";

import { PORTAL_ROOT } from "../../utils/constants";
import cross from "../../images/modal-cross-close-icon.svg";

import ModalOverlay from "./modal-overlay/modal-overlay";

function Modal({ children }) {
  const dispatch = useDispatch();

  const closeByEscape = (e) => {
    if (e.key === "Escape") {
      dispatch(setOpened(false));
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
      <div className={styles.inner}>
        <img
          src={cross}
          alt="Закрыть"
          className={`${styles.close} mt-15 mr-10`}
          onClick={() => dispatch(setOpened(false))}
        />
        {children}
      </div>
      <ModalOverlay />
    </section>,
    PORTAL_ROOT
  );
}

export default Modal;
