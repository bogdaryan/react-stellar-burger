import styles from "./template-ingredient.module.css";

type ClassName = {
  ingredientClassName: string | null;
};

function TemplateIngredient({ ingredientClassName }: ClassName) {
  return (
    <div className={`${styles.element} ${ingredientClassName} $ ml-8`}>
      <p className="text text_type_main-default ">Выберите ингредиент</p>
    </div>
  );
}

export default TemplateIngredient;
