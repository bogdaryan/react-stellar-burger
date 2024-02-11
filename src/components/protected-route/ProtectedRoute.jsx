import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { getUser } from "../../services/user/selectors";

const Protected = ({ onlyUnAuth = false, component }) => {
  const user = useSelector(getUser);
  const location = useLocation();

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;

export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);
