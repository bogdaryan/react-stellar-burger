import {
  PasswordInput,
  EmailInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import MotionElement from "../../components/motion-element/motion-element";

const SignUp = () => {
  return (
    <section className="container">
      <MotionElement>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <form>
          <Input
            type={"text"}
            placeholder={"Имя"}
            value={""}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mt-6"
          />
          <EmailInput
            value={""}
            name={"email"}
            isIcon={false}
            extraClass="mt-6"
          />
          <PasswordInput value={""} name={"password"} extraClass="mt-6" />
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="mt-6 mb-20"
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
};

export default SignUp;
