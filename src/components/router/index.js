import { createBrowserRouter } from "react-router-dom";

import App from "../app/app";

import {
  Home,
  SignUp,
  SignIn,
  ForgotPassword,
  ResetPassword,
  NotFound404,
} from "../../pages";

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
    ],
  },
  {
    path: "*",
    element: <NotFound404 />,
  },
]);
