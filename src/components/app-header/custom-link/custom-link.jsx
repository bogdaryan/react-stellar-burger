import React from "react";
import { useMatch } from "react-router-dom";
import { Link } from "react-router-dom";

const CustomLink = ({ children, className, classNameActive, to, Icon }) => {
  const match = useMatch(to);

  const activeLink = match ? classNameActive : null;

  return (
    <Link className={`${activeLink} ${className}`} to={to}>
      <Icon type={match ? "active" : "secondary"} />
      {children}
    </Link>
  );
};

export default CustomLink;
