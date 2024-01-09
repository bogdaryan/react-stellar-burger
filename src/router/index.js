import { createBrowserRouter } from "react-router-dom";

import {
  OnlyAuth,
  OnlyUnAuth,
} from "../components/protected-route/ProtectedRoute";

import App from "../components/app/app";

import {
  Home,
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  NotFound404,
  Profile,
  Feed,
  ProfileOrders,
  OrderComposition,
  IngredientDetailsCover,
} from "../pages";

import UserInfo from "../components/user-info/user-info";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <OnlyUnAuth component={<Login />} />,
      },
      {
        path: "/register",
        element: <OnlyUnAuth component={<Register />} />,
      },
      {
        path: "/forgot-password",
        element: <OnlyUnAuth component={<ForgotPassword />} />,
      },
      {
        path: "/reset-password",
        element: <OnlyUnAuth component={<ResetPassword />} />,
      },
      {
        path: "/profile",
        element: <OnlyAuth component={<Profile />} />,
        children: [
          {
            path: "/profile",
            element: <UserInfo />,
          },
          {
            path: "/profile/orders",
            element: <ProfileOrders />,
          },
        ],
      },
      {
        path: "/feed",
        element: <Feed />,
        children: [
          {
            path: "/feed/order",
            element: <OrderComposition />,
          },
        ],
      },
      {
        path: "/test",
        element: <IngredientDetailsCover />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound404 />,
  },
]);
