import { ReactNode, useEffect } from "react";

import styles from "./modal.module.css";

import ModalOverlay from "./modal-overlay/modal-overlay";
import { useNavigate, useParams } from "react-router-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type Props = {
  children?: ReactNode;
};

function Modal({ children }: Props) {
  const navigate = useNavigate();
  const { id, number } = useParams();

  function close() {
    if (id) {
      navigate("/");
    }
    if (number) {
      navigate(-1);
    }
  }

  function closeByEscape(e: KeyboardEvent) {
    if (e.key === "Escape") {
      close();
    }
  }

  /* eslint-disable */
  useEffect(() => {
    document.addEventListener("keydown", closeByEscape);

    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []);
  /* eslint-enable */

  return (
    <section className={styles.modal}>
      <div className={`${styles.inner}`}>
        <div className={`${styles.close} mt-15 mr-10`}>
          <CloseIcon onClick={() => close()} type="primary" />
        </div>

        {children}
      </div>
      <ModalOverlay close={close} />
    </section>
  );
}

export default Modal;
