import style from "./template-bun.module.css";

const TemplateBun = ({ type }) => {
  const classNameType = type === "top" ? style.top : style.bottom;

  return (
    <div className={`${classNameType} ${style.element} ml-8`}>
      <p className="text text_type_main-default">Выберите булку</p>
    </div>
  );
};

export default TemplateBun;
