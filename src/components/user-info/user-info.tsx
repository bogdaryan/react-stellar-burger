import styles from "./user-info.module.css";
import { ChangeEvent, FormEvent, useState } from "react";

import useForm from "../../hooks/useForm";

import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import CustomInput from "./custom-input/custom-input";

import { useEditUserMutation } from "../../services/api/user.api";
import { TUseForm } from "../../types/types";

const UserInfo = () => {
  const [editUserInfo] = useEditUserMutation();
  const [isVisible, setVisible] = useState(false);

  const { email, name } = JSON.parse(localStorage.getItem("user") as string);

  const { formData, handleChange } = useForm({
    email: email,
    name: name,
    password: "",
  });

  const [updatedData, setUpdatedFormData] = useState<TUseForm>({});

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    handleChange(e);
    setVisible(true);

    const { name, value } = e.target;
    setUpdatedFormData((state) => ({ ...state, [name]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    editUserInfo(updatedData).then(() => setVisible(false));
  }

  return (
    <div className={styles.userInfo}>
      <form onSubmit={onSubmit}>
        <CustomInput onChange={onChange} value={formData.name || ""} />
        <EmailInput
          onChange={onChange}
          value={formData.email || ""}
          name="email"
          placeholder="Логин"
          isIcon={true}
          autoComplete="current-email"
          extraClass="mt-6 mb-6"
        />
        <PasswordInput
          onChange={onChange}
          value={formData.password || ""}
          name="password"
          icon="EditIcon"
          autoComplete="current-password"
        />
        {isVisible && (
          <div className={styles.buttonsBox}>
            <Button htmlType="button" type="secondary" size="medium">
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserInfo;
