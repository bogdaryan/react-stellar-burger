import {
  PasswordInput,
  EmailInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";

import MotionElement from "../../components/motion-element/motion-element";

import { useRegisterMutation } from "../../services/api/user.api";
import { FormEvent } from "react";

function Register() {
  const [register] = useRegisterMutation();

  const navigate = useNavigate();
  const { formData, handleChange } = useForm({});

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    register(formData).then(() => navigate("/login"));
  }

  return (
    <section className="container">
      <MotionElement>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="Имя"
            name="name"
            error={false}
            errorText="Ошибка"
            size="default"
            extraClass="mt-6"
            value={formData.name || ""}
            onChange={handleChange}
          />
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
            onClick={onSubmit}
          >
            Зарегистрироваться
          </Button>
        </form>
        <div className="container__text-wrapper text text_type_main-default mb-4">
          <p className="container__text-title text">Уже зарегистрированы?</p>
          <Link className="container__text-link" to={"/login"}>
            Войти
          </Link>
        </div>
      </MotionElement>
    </section>
  );
}

export default Register;
