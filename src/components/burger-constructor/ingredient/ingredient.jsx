import { useRef } from "react";

import { useDrag, useDrop } from "react-dnd";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch } from "react-redux";
import {
  deleteIngredient,
  moveConstructorIngredient,
} from "../../../services/ingredients/ingredients";

import styles from "./ingredient.module.css";

const Ingredient = (props) => {
  const { id, name, price, image, index } = props;
  const dispatch = useDispatch();

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "sort_ingredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(moveConstructorIngredient({ hoverIndex, dragIndex }));
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: "sort_ingredient",
    item: () => {
      return { id, index };
    },
  });

  drag(drop(ref));

  return (
    <li
      className={styles.item}
      draggable={true}
      index={index}
      ref={ref}
      data-handler-id={handlerId}
      id={id}
    >
      <div className={styles.img}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => dispatch(deleteIngredient(id))}
      />
    </li>
  );
};

export default Ingredient;
