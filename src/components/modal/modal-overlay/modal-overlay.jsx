import styles from "./modal-overlay.module.css";

import { useNavigate } from "react-router-dom";

const ModalOverlay = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(-1)} className={`${styles.overlay}`}></div>
  );
};

export default ModalOverlay;
