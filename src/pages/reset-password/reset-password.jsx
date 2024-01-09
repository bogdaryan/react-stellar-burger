import useForm from "../../hooks/useForm";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import MotionElement from "../../components/motion-element/motion-element";

const ResetPassword = () => {
  const { values, handleChange } = useForm({});

  const onChange = (e) => {
    handleChange(e);
  };

  const onSubmit = () => {
    console.log(values);
  };

  return (
    <section className="container">
      <MotionElement>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <form>
          <PasswordInput
            name={"password"}
            extraClass="mt-6"
            placeholder="Введите новый пароль"
            autoComplete="password"
            value={values.password || ""}
            onChange={onChange}
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            name={"code"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mt-6"
            value={values.code || ""}
            onChange={onChange}
          />
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="mt-6 mb-20"
            onClick={onSubmit}
          >
            Сохранить
          </Button>
        </form>
        <div className="container__text-wrapper text text_type_main-default mb-4">
          <p className="container__text-title text">Вспомнили пароль?</p>
          <Link className="container__text-link" to={"/login"}>
            Войти
          </Link>
        </div>
      </MotionElement>
    </section>
  );
};

export default ResetPassword;
