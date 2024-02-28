import { TIngredientTypes } from "../types/types";

export const URL = "https://norma.nomoreparties.space/api";
export const wsURL = "wss://norma.nomoreparties.space";

export const PORTAL_ROOT = document.querySelector("#portal-root") as Element;

export const ingredientTypes: TIngredientTypes = {
  buns: { title: "Булки", filter: "bun" },
  sauce: { title: "Соусы", filter: "sauce" },
  main: { title: "Начинки", filter: "main" },
};
