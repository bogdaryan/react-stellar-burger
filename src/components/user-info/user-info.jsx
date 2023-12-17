import { useState } from "react";

import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

const UserInfo = () => {
  const [value, setValue] = useState("value");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <div className="user-info">
        <EmailInput
          onChange={onChange}
          value={value}
          name={"name"}
          placeholder="Имя"
          isIcon={true}
        />
        <EmailInput
          onChange={onChange}
          value={value}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          extraClass="mt-6 mb-6"
        />
        <PasswordInput
          onChange={onChange}
          value={value}
          name={"password"}
          icon="EditIcon"
        />
      </div>
    </>
  );
};

export default UserInfo;
