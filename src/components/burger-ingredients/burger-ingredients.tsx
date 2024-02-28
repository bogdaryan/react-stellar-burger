import { RefObject, useRef, useState } from "react";
import { useSelector } from "../../hooks/hooks";

import Tabs from "./tabs/tabs";
import Ingredient from "./ingredient/ingredient";

import styles from "./burger-ingredients.module.css";

import {
  getIngredients,
  getIngredientsCounters,
} from "../../services/ingredients/selectors";
import { Outlet } from "react-router-dom";

import { ingredientTypes } from "../../utils/constants";

import { TCounter, TIngredient } from "../../types/types";
import useViewportHeight from "../../hooks/useViewportHeight";

type SectionRefs = {
  [key: string]: RefObject<HTMLHeadingElement>;
};

function BurgerIngredients() {
  const ingredients = useSelector(getIngredients);
  const counter: TCounter | {} = useSelector(getIngredientsCounters);
  const [activeTab, setActiveTab] = useState<string>("bun");
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const height = useViewportHeight(scrollTrackRef);

  const sectionRefs: SectionRefs = {
    bun: useRef<HTMLHeadingElement>(null),
    sauce: useRef<HTMLHeadingElement>(null),
    main: useRef<HTMLHeadingElement>(null),
  };

  const handlleChangeTab = () => {
    const containerTop =
      scrollTrackRef.current?.getBoundingClientRect().top ?? 0;
    const sauceTop =
      sectionRefs.sauce.current?.getBoundingClientRect().top ?? 0;
    const mainTop = sectionRefs.main.current?.getBoundingClientRect().top ?? 0;

    if (containerTop >= mainTop) {
      setActiveTab("main");
    } else if (containerTop >= sauceTop) {
      setActiveTab("sauce");
    } else {
      setActiveTab("bun");
    }
  };

  return (
    <>
      <section className={`${styles.ingredients} mr-10`}>
        <h1 className="text text_type_main-large mb-5 mt-10 ">
          Соберите бургер
        </h1>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <section
          className={`${styles.scroll} scrollbarTrackBorder custom-scroll`}
          ref={scrollTrackRef}
          style={{ maxHeight: height }}
          onScroll={handlleChangeTab}
        >
          {Object.values(ingredientTypes).map(({ title, filter }) => {
            return (
              <section
                key={filter}
                className={styles.filter}
                data-type={filter}
              >
                <h2
                  className={`${styles.title} text text_type_main-medium mb-5`}
                  ref={sectionRefs[filter]}
                >
                  {title}
                </h2>

                <div className={`${styles.list} mb-10`}>
                  {ingredients &&
                    ingredients
                      .filter((i: TIngredient) => i.type === filter)
                      .map((ingredient: TIngredient) => {
                        return (
                          <Ingredient
                            ingredientDetails={ingredient}
                            key={ingredient._id}
                            counter={counter}
                          />
                        );
                      })}
                </div>
              </section>
            );
          })}
        </section>
      </section>
      <Outlet />
    </>
  );
}

export default BurgerIngredients;
