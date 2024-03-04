import { TIngredient } from "../../types/types";
import styles from "./ingredient-img.module.css";

type Props = {
  ingredientDetails: TIngredient;
  classNameModal?: string;
};

function IngredientImg({ ingredientDetails, classNameModal = "" }: Props) {
  if (!ingredientDetails) return null;

  const { image, name } = ingredientDetails;

  return (
    <div
      className={`${styles.ingredient} ${classNameModal}  text text_type_digits-default`}
    >
      <img className={styles.img} src={image} alt={name} />
    </div>
  );
}

export default IngredientImg;
