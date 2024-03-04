import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";

import MotionElement from "../../components/motion-element/motion-element";

import {
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useLoginMutation } from "../../services/api/user.api";
import { FormEvent } from "react";

function Login() {
  const [login] = useLoginMutation();
  const { formData, handleChange } = useForm({});

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    login(formData);
  }

  return (
    <section className="container">
      <MotionElement>
        <h2 className="text text_type_main-medium">Вход</h2>
        <form onSubmit={onSubmit}>
          <EmailInput
            name="email"
            isIcon={false}
            extraClass="mt-6"
            autoComplete="current-email"
            value={formData.email || ""}
            onChange={handleChange}
          />
          <PasswordInput
            name="password"
            extraClass="mt-6"
            autoComplete="current-password"
            value={formData.password || ""}
            onChange={handleChange}
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mt-6 mb-20"
          >
            Войти
          </Button>
        </form>
        <div className="container__text-wrapper text text_type_main-default mb-4">
          <p className="container__text-title text">Вы — новый пользователь?</p>
          <Link className="container__text-link" to="/register">
            Зарегистрироваться
          </Link>
        </div>
        <div className="container__text-wrapper text_type_main-default">
          <p className="container__text-title text">Забыли пароль?</p>
          <Link className="container__text-link" to="/forgot-password ">
            Восстановить пароль
          </Link>
        </div>
      </MotionElement>
    </section>
  );
}

export default Login;
