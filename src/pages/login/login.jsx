import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";

import MotionElement from "../../components/motion-element/motion-element";

import {
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch } from "react-redux";
import { userLoginRequest } from "../../services/auth/loginApi";

const Login = () => {
  const dispatch = useDispatch();
  const { formData, handleChange } = useForm({});

  const onChange = (e) => {
    handleChange(e);
  };

  const onSubmit = () => {
    dispatch(userLoginRequest(formData));
  };

  return (
    <section className="container">
      <MotionElement>
        <h2 className="text text_type_main-medium">Вход</h2>
        <form>
          <EmailInput
            name={"email"}
            isIcon={false}
            extraClass="mt-6"
            autoComplete="current-email"
            value={formData.email || ""}
            onChange={onChange}
          />
          <PasswordInput
            name={"password"}
            extraClass="mt-6"
            autoComplete="current-password"
            value={formData.password || ""}
            onChange={onChange}
          />
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="mt-6 mb-20"
            onClick={onSubmit}
          >
            Войти
          </Button>
        </form>
        <div className="container__text-wrapper text text_type_main-default mb-4">
          <p className="container__text-title text">Вы — новый пользователь?</p>
          <Link className="container__text-link" to={"/register"}>
            Зарегистрироваться
          </Link>
        </div>
        <div className="container__text-wrapper text_type_main-default">
          <p className="container__text-title text">Забыли пароль?</p>
          <Link className="container__text-link" to={"/forgot-password "}>
            Восстановить пароль
          </Link>
        </div>
      </MotionElement>
    </section>
  );
};

export default Login;
