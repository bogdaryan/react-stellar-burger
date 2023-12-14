import { Link } from "react-router-dom";

const NotFound404 = () => {
  return (
    <div>
      <h1>Page Not Found 404</h1>
      <Link className="container__text-link" to="/">
        Вернутся на главную страницу
      </Link>
    </div>
  );
};

export default NotFound404;
