import { Link, useNavigate } from "react-router-dom";
import MotionElement from "../../components/motion-element/motion-element";
import useForm from "../../hooks/useForm";
import { useSendResetPasswordCodeMutation } from "../../services/api/user.api";

import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent } from "react";
import { TUseForm } from "../../types/types";

function ForgotPassword() {
  const [sendResetCodeToEmail] = useSendResetPasswordCodeMutation();
  const navigate = useNavigate();
  const { formData, handleChange } = useForm({});

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };

  const onSubmit = () => {
    if (!formData.email) return;

    const email = formData.email as TUseForm;

    sendResetCodeToEmail(email).then(() => {
      navigate("/reset-password");
    });
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
            value={formData.email || ""}
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
          <Link className="container__text-link" to="/login">
            Войти
          </Link>
        </div>
      </MotionElement>
    </section>
  );
}

export default ForgotPassword;
