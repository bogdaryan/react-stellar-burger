import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Tabs from "./tabs/tabs";
import Ingredient from "./ingredient/ingredient";

import style from "./burger-ingredients.module.css";
import useHeight from "../../hooks/useSetHeight";

function BurgerIngredients({ setScrollHeight, scrollHeight }) {
  const [activeTab, setActiveTab] = useState("bun");
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const { constructorIngredients, bun } = useSelector(
    (store) => store.ingredients
  );

  const ingredientsInConstructor = useMemo(
    () => [...constructorIngredients, bun, bun],
    [constructorIngredients, bun]
  );

  const counter = useMemo(() => {
    const counterObj = {};

    ingredientsInConstructor.forEach((ingredient) => {
      if (!ingredient) return;

      const ingredientName = ingredient.name;
      counterObj[ingredientName] = (counterObj[ingredientName] || 0) + 1;
    });

    return counterObj;
  }, [ingredientsInConstructor]);

  const ingredientTypes = {
    buns: { title: "Булки", filter: "bun" },
    sauce: { title: "Соусы", filter: "sauce" },
    main: { title: "Начинки", filter: "main" },
  };

  const scrollTrackRef = useRef();
  const height = useHeight(scrollTrackRef);

  useEffect(() => {
    setScrollHeight(height);
  });

  const sectionRefs = {
    bun: useRef(),
    sauce: useRef(),
    main: useRef(),
  };

  const handlleChangeTab = (e) => {
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
    <section className={`${style.ingredients} mr-10`}>
      <h1 className="text text_type_main-large mb-5 mt-10 ">Соберите бургер</h1>
      <Tabs activeTab={activeTab} />
      <section
        className={`${style.scroll} custom-scroll`}
        ref={scrollTrackRef}
        style={{ maxHeight: scrollHeight }}
        onScroll={handlleChangeTab}
      >
        {Object.values(ingredientTypes).map(({ title, filter }) => {
          return (
            <section key={filter} className={style.filter} data-type={filter}>
              <h2
                className={`${style.title} text text_type_main-medium mb-5`}
                ref={sectionRefs[filter]}
              >
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
                        counter={counter}
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

export default BurgerIngredients;
