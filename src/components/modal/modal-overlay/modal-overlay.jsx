import React, { useState } from "react";
import style from "./modal-overlay.module.css";
import Modal from "../modal";

function ModalOverlay({ children }) {
  return <section className={`${style.overlay}`}>{children}</section>;
}

export default ModalOverlay;
