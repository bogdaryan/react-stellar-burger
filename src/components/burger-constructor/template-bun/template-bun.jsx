import style from "./template-bun.module.css";
import PropTypes from "prop-types";

const TemplateBun = ({ type, bunClassName }) => {
  const classNameType = type === "top" ? style.top : style.bottom;

  return (
    <div className={`${classNameType} ${style.element} ${bunClassName} ml-8`}>
      <p className="text text_type_main-default">Выберите булку</p>
    </div>
  );
};

TemplateBun.propTypes = {
  type: PropTypes.string.isRequired,
  bunClassName: PropTypes.string,
};

export default TemplateBun;
