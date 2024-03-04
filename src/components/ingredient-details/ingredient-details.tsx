import { useSelector } from "../../hooks/hooks";
import styles from "./ingredient-details.module.css";
import { getIngredients } from "../../services/ingredients/selectors";
import { useParams } from "react-router-dom";

function IngredientDetails() {
  const { id } = useParams();
  const ingredients = useSelector(getIngredients);
  const ingredientDetails =
    ingredients && ingredients.find(({ _id }) => _id === id);

  if (!ingredientDetails) {
    return null;
  }

  const { name, image_large, calories, proteins, fat, carbohydrates } =
    ingredientDetails;

  return (
    <div className={`${styles.ingredient}`}>
      <h2 className={`${styles.text} text text_type_main-large`}>
        Детали ингредиента
      </h2>
      <img src={image_large} alt="Фото ингредиента" />

      <p className={`${styles.name} text text_type_main-medium `}>{name}</p>
      <ul className={styles.list}>
        <li className={styles.item}>
          <p className="text text_type_main-default">Калории,ккал</p>
          <p className="text text_type_main-medium">{calories}</p>
        </li>
        <li className={styles.item}>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_main-medium">{proteins}</p>
        </li>
        <li className={styles.item}>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_main-medium">{fat}</p>
        </li>
        <li className={styles.item}>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_main-medium">{carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
