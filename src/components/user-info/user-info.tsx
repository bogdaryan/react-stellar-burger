import styles from "./user-info.module.css";
import { ChangeEvent, useState } from "react";

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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setVisible(true);

    const { name, value } = e.target;
    setUpdatedFormData((state) => ({ ...state, [name]: value }));
  };

  const onSubmit = () => {
    editUserInfo(updatedData);
    setVisible(false);
  };

  return (
    <div className={styles.userInfo}>
      <form>
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
      </form>
      {isVisible && (
        <div className={styles.buttonsBox}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={() => setVisible(false)}
          >
            Отмена
          </Button>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={onSubmit}
          >
            Сохранить
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
