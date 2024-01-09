import useForm from "../../hooks/useForm";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";

import MotionElement from "../../components/motion-element/motion-element";

import { sendCodeRequest } from "../../services/auth/forgotPasswordApi";

import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, handleChange } = useForm({});

  const onChange = (e) => {
    handleChange(e);
  };

  const onSubmit = () => {
    // console.log(values);
    // navigate("/reset-password");
    dispatch(sendCodeRequest("likeonion420@gmail.com"));
  };

  return (
    <section className="container">
      <MotionElement>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <form>
          <EmailInput
            name={"email"}
            isIcon={false}
            extraClass="mt-6"
            placeholder="Укажите e-mail"
            autoComplete="current-email"
            value={values.email || ""}
            onChange={onChange}
          />
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="mt-6 mb-20"
            onClick={onSubmit}
          >
            Восстановить
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

export default ForgotPassword;
