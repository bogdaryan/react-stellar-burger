import { createBrowserRouter } from "react-router-dom";

import App from "../components/app/app";

import {
  Home,
  SignUp,
  SignIn,
  ForgotPassword,
  ResetPassword,
  NotFound404,
  Profile,
  Feed,
  ProfileOrders,
  OrderComposition,
} from "../pages";

import UserInfo from "../components/user-info/user-info";

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
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/recovery-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/profile",
        element: <Profile />,
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
    ],
  },
  {
    path: "*",
    element: <NotFound404 />,
  },
]);
