import style from "./modal-overlay.module.css";

import { useDispatch } from "react-redux";
import { setOpened } from "../../../services/modalSlice";

const ModalOverlay = () => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(setOpened(false))}
      className={`${style.overlay}`}
    ></div>
  );
};

export default ModalOverlay;
