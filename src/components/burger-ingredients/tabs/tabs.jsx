import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./tabs.module.css";

function Tabs({ activeTab }) {
  return (
    <div className={`${style.tabs} mb-10`}>
      <Tab value="bun" active={activeTab === "bun"}>
        Булки
      </Tab>
      <Tab value="sauce" active={activeTab === "sauce"}>
        Соусы
      </Tab>
      <Tab value="main" active={activeTab === "main"}>
        Начинки
      </Tab>
    </div>
  );
}

export default Tabs;
