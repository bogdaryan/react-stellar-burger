// import { useLocation } from "react-router-dom";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

function LayoutIngredient() {
  // const location = useLocation();
  // const background = location.state?.background;
  // const isModal = background;

  return (
    <Modal>
      <IngredientDetails />
    </Modal>
  );
}

export default LayoutIngredient;
