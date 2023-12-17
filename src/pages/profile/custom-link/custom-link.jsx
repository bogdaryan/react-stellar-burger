import { Link, useMatch } from "react-router-dom";

const CustomLink = ({ children, to, classNameActive, className, ...props }) => {
  const match = useMatch(to);

  const activeLink = match ? classNameActive : null;

  return (
    <Link className={`${activeLink} ${className}`} to={to} {...props}>
      {children}
    </Link>
  );
};

export default CustomLink;
