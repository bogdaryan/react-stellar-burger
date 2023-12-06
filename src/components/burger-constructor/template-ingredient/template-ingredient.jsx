import style from "./template-ingredient.module.css";
import PropTypes from "prop-types";

const TemplateIngredient = ({ ingredientClassName }) => {
  return (
    <div className={`${style.element} ${ingredientClassName} $ ml-8`}>
      <p className="text text_type_main-default ">Выберите ингредиент</p>
    </div>
  );
};

TemplateIngredient.propTypes = {
  ingredientClassName: PropTypes.string,
};

export default TemplateIngredient;
