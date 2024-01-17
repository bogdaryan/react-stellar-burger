import styles from "./ingredient-img.module.css";

const IngredientImg = () => {
  return (
    // ${className}
    <div className={`${styles.ingredient}  text text_type_digits-default`}>
      {/* <img className={styles.img} src={image} alt={name} /> */}
    </div>
  );
};

export default IngredientImg;
