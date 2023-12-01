import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { setOpened } from "../../services/modalSlice";

import style from "./modal.module.css";

//   console.log({
//     refInView: refView,
//     inView: inView,
//     entry: entry,
//   });
// });
import { PORTAL_ROOT } from "../../utils/constants";
import cross from "../../images/modal-cross-close-icon.svg";

import ModalOverlay from "./modal-overlay/modal-overlay";

// import { useInView } from "react-intersection-observer";

function Modal({ children }) {
  // const [refView, inView, entry] = useInView();

  // useEffect(() => {
  //   console.log({
  //     refInView: refView,
  //     inView: inView,
  //     entry: entry,
  //   });
  // });

  const dispatch = useDispatch();

  const closeByEscape = (e) => {
    if (e.key === "Escape") {
      dispatch(setOpened(false));
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

// {
//   section1: {
//     title1: [el[2], el[3]]
//   }
// }
