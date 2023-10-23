import React, { useEffect, useRef, useState } from "react";
import Tabs from "./tabs/tabs";
import Ingridient from "./ingridient/ingridient";
import style from "./burger-ingredients.module.css";

function BurgerIngredients({ data }) {
  const [heightScrollTrack, setHeight] = useState(0);

  const ingredientTypes = {
    buns: { title: "Булки", filter: "bun" },
    sauce: { title: "Соусы", filter: "sauce" },
    main: { title: "Начинки", filter: "main" },
  };

  const scrollTrackRef = useRef();

  useEffect(() => {
    const scrollTrack = scrollTrackRef.current.getBoundingClientRect().top;
    const innerHeight = window.innerHeight;
    const trackHeight = innerHeight - scrollTrack;
    setHeight(trackHeight);
  }, []);

  return (
    <section className={style.ingredients}>
      <h1 className="text text_type_main-large mb-5 mt-10 ">Соберите бургер</h1>
      <Tabs />
      <section
        className={`${style.scroll} custom-scroll mt-10`}
        ref={scrollTrackRef}
        style={{ height: heightScrollTrack }}
      >
        {Object.values(ingredientTypes).map(({ title, filter }) => {
          return (
            <section key={filter} className="pb-8">
              <h2
                className={`${style.title} mb-5 text text_type_main-medium }`}
              >
                {title}
              </h2>

              <ul className={`${style.list}`}>
                {data
                  .filter((el) => el.type === filter)
                  .map(({ image, name, price, _id }) => {
                    return (
                      <Ingridient
                        image={image}
                        title={name}
                        price={price}
                        count={1}
                        key={_id}
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
