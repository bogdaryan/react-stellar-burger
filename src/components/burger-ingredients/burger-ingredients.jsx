import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import Tabs from "./tabs/tabs";
import Ingredient from "./ingredient/ingredient";

import style from "./burger-ingredients.module.css";
import useHeight from "../../hooks/useSetHeight";

import { ingredientPropType } from "../../utils/prop-types";

function BurgerIngredients({ ingredients, getCurrentIngredient }) {
  const [heightScrollTrack, setHeight] = useState(0);

  const ingredientTypes = {
    buns: { title: "Булки", filter: "bun" },
    sauce: { title: "Соусы", filter: "sauce" },
    main: { title: "Начинки", filter: "main" },
  };

  const scrollTrackRef = useRef();
  const height = useHeight(scrollTrackRef);

  useEffect(() => {
    localStorage.setItem("height", height);
    setHeight(height);
  });

  return (
    <section className={`${style.ingredients} mr-10`}>
      <h1 className="text text_type_main-large mb-5 mt-10 ">Соберите бургер</h1>
      <Tabs />
      <section
        className={`${style.scroll} custom-scroll`}
        ref={scrollTrackRef}
        style={{ maxHeight: heightScrollTrack }}
      >
        {Object.values(ingredientTypes).map(({ title, filter }) => {
          return (
            <section key={filter} className={style.filter}>
              <h2 className={`${style.title} text text_type_main-medium mb-5`}>
                {title}
              </h2>

              <ul className={`${style.list} mb-10`}>
                {ingredients
                  .filter((el) => el.type === filter)
                  .map((ingredient) => {
                    return (
                      <Ingredient
                        ingredientDetails={ingredient}
                        key={ingredient._id}
                        getCurrentIngredient={getCurrentIngredient}
                      />
                    );
                  })}
              </ul>
            </section>
          );
        })}
      </section>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerIngredients;
