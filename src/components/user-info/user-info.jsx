import styles from "./user-info.module.css";

import useForm from "../../hooks/useForm";

import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import CustomInput from "./custom-input/custom-input";
import { useSelector } from "react-redux";
import { getUser } from "../../services/auth/selectors";

const UserInfo = () => {
  const { email, name } = useSelector(getUser);

  const { values, handleChange } = useForm({
    email: email,
    name: name,
    password: "",
  });

  const onChange = (e) => {
    handleChange(e);
  };

  return (
    <div className={styles.userInfo}>
      <form>
        <CustomInput onChange={onChange} value={values.name} />
        <EmailInput
          onChange={onChange}
          value={values.email}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          autoComplete="current-email"
          extraClass="mt-6 mb-6"
        />
        <PasswordInput
          onChange={onChange}
          value={values.password}
          name={"password"}
          icon="EditIcon"
          autoComplete="current-password"
        />
      </form>
    </div>
  );
};

export default UserInfo;
