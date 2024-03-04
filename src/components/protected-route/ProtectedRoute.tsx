import { useSelector } from "../../hooks/hooks";
import { Navigate, useLocation } from "react-router-dom";

import { getLoginStatus } from "../../services/user/selectors";
import { ReactNode } from "react";

type Props = {
  onlyUnAuth?: boolean;
  component: ReactNode;
};

const Protected = ({ onlyUnAuth = false, component }: Props): JSX.Element => {
  const isLoggedIn = useSelector(getLoginStatus);
  const location = useLocation();

  if (onlyUnAuth && isLoggedIn) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{component}</>;
};

export const OnlyAuth = Protected;

export const OnlyUnAuth = ({ component }: Props) => (
  <Protected onlyUnAuth={true} component={component} />
);
