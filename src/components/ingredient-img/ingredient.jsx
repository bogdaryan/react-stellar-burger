import styles from "./ingredient-img.module.css";

const IngredientImg = ({ image, title, className }) => {
  return (
    <div
      className={`${styles.ingredient} ${className} text text_type_digits-default`}
    >
      <img
        className={styles.img}
        src={image || "https://code.s3.yandex.net/react/code/sauce-04.png"}
        alt={title || "title"}
      />
    </div>
  );
};

export default IngredientImg;
