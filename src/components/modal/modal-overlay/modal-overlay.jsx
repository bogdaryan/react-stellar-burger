import React from "react";
import style from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClose }) => (
  <div onClick={onClose} className={`${style.overlay}`}></div>
);

ModalOverlay.propsType = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
