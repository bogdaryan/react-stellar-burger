import style from "./template-ingredient.module.css";

import { useSelector } from "react-redux";

const TemplateIngredient = () => {
  const isDrag = useSelector((store) => store.dnd.isDrag);
  const typeIngredient = useSelector((store) => store.dnd.typeIngredient);

  const borderStyle = isDrag && typeIngredient !== "bun" ? style.isDrag : null;

  return (
    <div className={`${style.element} ${borderStyle} ml-8`}>
      <p className="text text_type_main-default ">Выберите ингредиент</p>
    </div>
  );
};

export default TemplateIngredient;
