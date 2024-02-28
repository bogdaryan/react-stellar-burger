export type TStatus = "done" | "created" | "pending";

export type TUser = {
  email: string;
  name: string;
};

export type TIngredientTypes = {
  [key: string]: {
    title: string;
    filter: string;
  };
};

export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_mobile: string;
  image_large: string;
  name: string;
  price: number;
  proteins: number;
  type: "bun" | "main" | "sauce";
  __v: number;
  _id: string;
  _key?: string;
};

export type TCounter = { [key: string]: number };

export type TOrderDetails = {
  createdAt: string;
  ingredients: TIngredient[];
  name: string;
  number: number;
  status: TStatus;
  updatedAt: string;
  _id: string;
  counters?: { [key: string]: number };
  hiddenIngredients?: TIngredient[];
  price?: number;
  statusDetails?: { [key: string]: string };
};

export type TWebSocketOrder = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: TStatus;
  updatedAt: string;
  _id: string;
};

export type TWebSocketMessage = {
  orders: TWebSocketOrder[];
  success: boolean;
  total: number;
  totalToday: number;
};

export type TUseForm = {
  email?: string;
  password?: string;
  name?: string;
  code?: string;
};

export type TCreateOrder = {
  order: TWebSocketOrder;
  success: boolean;
  name: string;
};
