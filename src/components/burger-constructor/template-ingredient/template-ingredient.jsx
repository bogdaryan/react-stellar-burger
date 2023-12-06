import style from "./template-ingredient.module.css";

const TemplateIngredient = () => {
  return (
    <div className={`${style.element} $ ml-8`}>
      <p className="text text_type_main-default ">Выберите ингредиент</p>
    </div>
  );
};

export default TemplateIngredient;
