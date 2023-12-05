import style from "./template-bun.module.css";

import { useSelector } from "react-redux";

const TemplateBun = ({ type }) => {
  const classNameType = type === "top" ? style.top : style.bottom;

  const isDrag = useSelector((store) => store.dnd.isDrag);
  const typeIngredient = useSelector((store) => store.dnd.typeIngredient);

  const borderStyle = isDrag && typeIngredient === "bun" ? style.isDrag : null;

  return (
    <div className={`${classNameType} ${style.element} ${borderStyle} ml-8`}>
      <p className="text text_type_main-default">Выберите булку</p>
    </div>
  );
};

export default TemplateBun;
