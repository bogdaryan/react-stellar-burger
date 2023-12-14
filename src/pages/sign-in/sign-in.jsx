import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MotionElement from "../../components/motion-element/motion-element";

import {
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const SignIn = () => {
  const [value, setValue] = useState();
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <section className="container">
      <MotionElement>
        <h2 className="text text_type_main-medium">Вход</h2>
        <form>
          <EmailInput
            onChange={onChange}
            value={""}
            name={"email"}
            isIcon={false}
            extraClass="mt-6"
          />
          <PasswordInput
            onChange={onChange}
            value={""}
            name={"password"}
            extraClass="mt-6"
          />
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="mt-6 mb-20"
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
          <Link className="container__text-link" to={"/recovery-password"}>
            Восстановить пароль
          </Link>
        </div>
      </MotionElement>
    </section>
  );
};

export default SignIn;
