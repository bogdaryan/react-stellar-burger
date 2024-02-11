import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Tabs from "./tabs/tabs";
import Ingredient from "./ingredient/ingredient";

import styles from "./burger-ingredients.module.css";
import useHeight from "../../hooks/useHeight";

import {
  getIngredients,
  getIngredientsCounters,
} from "../../services/ingredients/selectors";
import { Outlet } from "react-router-dom";

import { ingredientTypes } from "../../utils/constants";

function BurgerIngredients({ setScrollHeight, scrollHeight }) {
  const ingredients = useSelector(getIngredients);
  const counter = useSelector(getIngredientsCounters);

  const [activeTab, setActiveTab] = useState("bun");

  const scrollTrackRef = useRef();
  const height = useHeight(scrollTrackRef);

  useEffect(() => {
    setScrollHeight(height);
    localStorage.setItem("height", height);
  }, [height, setScrollHeight]);

  const sectionRefs = {
    bun: useRef(),
    sauce: useRef(),
    main: useRef(),
  };

  const handlleChangeTab = () => {
    const containerTop = scrollTrackRef.current.getBoundingClientRect().top;

    const sauceTop = sectionRefs.sauce.current.getBoundingClientRect().top;
    const mainTop = sectionRefs.main.current.getBoundingClientRect().top;

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
        <Tabs activeTab={activeTab} />
        <section
          className={`${styles.scroll} scrollbarTrackBorder custom-scroll`}
          ref={scrollTrackRef}
          style={{ maxHeight: scrollHeight }}
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
                  {ingredients.length &&
                    ingredients &&
                    ingredients
                      .filter((el) => el.type === filter)
                      .map((ingredient) => {
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
