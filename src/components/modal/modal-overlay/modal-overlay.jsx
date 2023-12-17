import styles from "./modal-overlay.module.css";

import { useDispatch } from "react-redux";
import { setOpened } from "../../../services/modalSlice";

const ModalOverlay = () => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(setOpened(false))}
      className={`${styles.overlay}`}
    ></div>
  );
};

export default ModalOverlay;
