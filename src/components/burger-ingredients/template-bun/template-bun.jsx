import style from "./template-bun.module.css";

const TemplateBun = ({ type }) => {
  return (
    <div
      className={`
        ${type === "top" ? style.top : style.bottom} ${style.element} ml-8`}
    >
      <p className="text text_type_main-default">Выберите булку</p>
    </div>
  );
};

export default TemplateBun;
