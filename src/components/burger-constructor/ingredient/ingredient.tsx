import { useRef } from "react";

import { useDrag, useDrop } from "react-dnd";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch } from "../../../hooks/hooks";

import {
  deleteIngredient,
  moveConstructorIngredient,
} from "../../../services/ingredients/ingredientsConstructorSlice";

import styles from "./ingredient.module.css";

type Props = {
  id: string;
  name: string;
  image: string;
  price: number;
  index: number;
};

function Ingredient(props: Props) {
  const { id, name, price, image, index } = props;
  const dispatch = useDispatch();

  const ref = useRef<HTMLLIElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "sort_ingredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: Props, monitor) {
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

      let hoverClientY = 0; // Устанавливаем значение по умолчанию

      if (clientOffset) {
        hoverClientY = clientOffset.y - hoverBoundingRect.top;
      }

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
      data-index={index}
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
}

export default Ingredient;
