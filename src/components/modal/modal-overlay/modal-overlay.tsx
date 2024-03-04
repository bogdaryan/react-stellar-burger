import styles from "./modal-overlay.module.css";

function ModalOverlay({ close }: { close: () => void }) {
  return <div onClick={() => close()} className={`${styles.overlay}`}></div>;
}

export default ModalOverlay;
