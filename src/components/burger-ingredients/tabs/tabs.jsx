import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./tabs.module.css";

function Tabs() {
  const [current, setCurrent] = React.useState("bun");

  return (
    <div className={`${style.tabs} mb-10`}>
      <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}

export default Tabs;
