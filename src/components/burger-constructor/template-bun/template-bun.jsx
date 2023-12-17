import styles from "./template-bun.module.css";
import PropTypes from "prop-types";

const TemplateBun = ({ type, bunClassName }) => {
  const classNameType = type === "top" ? styles.top : styles.bottom;

  return (
    <div className={`${classNameType} ${styles.element} ${bunClassName} ml-8`}>
      <p className="text text_type_main-default">Выберите булку</p>
    </div>
  );
};

TemplateBun.propTypes = {
  type: PropTypes.string.isRequired,
  bunClassName: PropTypes.string,
};

export default TemplateBun;
