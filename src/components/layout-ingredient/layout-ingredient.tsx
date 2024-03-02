import { IngredientDetailsCover } from "../../pages";
import { useLocation } from "react-router-dom";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

function LayoutIngredient() {
  const location = useLocation();
  const background = location.state?.background;
  const isModal = background;

  if (isModal) {
    return (
      <Modal>
        <IngredientDetails />
      </Modal>
    );
  }

  if (!isModal) {
    return <IngredientDetailsCover />;
  }
}

export default LayoutIngredient;
