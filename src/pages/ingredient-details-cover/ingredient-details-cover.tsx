import IngredientDetails from "../../components/ingredient-details/ingredient-details";

import styles from "./ingredient-details-cover.module.css";

function IngredientDetailsCover() {
  return (
    <section className={styles.container}>
      <IngredientDetails />
    </section>
  );
}

export default IngredientDetailsCover;
