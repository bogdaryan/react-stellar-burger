import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import TemplateBun from "../template-bun/template-bun";

import style from "./bun.module.css";

import { useSelector } from "react-redux";

const Bun = ({ type }) => {
  const bun = useSelector((store) => store.ingredients.bun);
  const bunType = type === "top" ? "top" : "bottom";
  const bunName = type === "top" ? "верх" : "низ";
  const bunStyle = type === "top" ? style.top : style.bottom;

  return (
    <>
      {bun ? (
        <ConstructorElement
          type={bunType}
          isLocked={true}
          text={`${bun.name} (${bunName})`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`${bunStyle} ml-8`}
        />
      ) : (
        <TemplateBun type={bunType} />
      )}
    </>
  );
};

export default Bun;
