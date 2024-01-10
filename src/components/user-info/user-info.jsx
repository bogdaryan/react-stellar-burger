import styles from "./user-info.module.css";
import { useEffect, useState } from "react";

import useForm from "../../hooks/useForm";

import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import CustomInput from "./custom-input/custom-input";
import { useDispatch, useSelector } from "react-redux";
import { editUserRequest } from "../../services/auth/editUser";

import {
  getEditUserRequestStatus,
  getUser,
} from "../../services/auth/selectors";

const UserInfo = () => {
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);
  const editUserSuccess = useSelector(getEditUserRequestStatus);
  const { email, name } = useSelector(getUser);

  const { formData, handleChange } = useForm({
    email: email,
    name: name,
    password: "",
  });

  const [updatedData, setUpdatedFormData] = useState({});

  const onChange = (e) => {
    handleChange(e);
    setVisible(true);

    const { name, value } = e.target;
    setUpdatedFormData((state) => ({ ...state, [name]: value }));
  };

  const onSubmit = () => {
    dispatch(editUserRequest(updatedData));
  };

  useEffect(() => {
    if (editUserSuccess) {
      setVisible(false);
    }
  }, [editUserSuccess]);

  return (
    <div className={styles.userInfo}>
      <form>
        <CustomInput onChange={onChange} value={formData.name} />
        <EmailInput
          onChange={onChange}
          value={formData.email}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          autoComplete="current-email"
          extraClass="mt-6 mb-6"
        />
        <PasswordInput
          onChange={onChange}
          value={formData.password}
          name={"password"}
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
