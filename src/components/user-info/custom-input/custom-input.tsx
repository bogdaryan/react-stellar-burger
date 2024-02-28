import { ChangeEvent, useRef, useState } from "react";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

function CustomInput({ onChange, value }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [disabled, setDisabled] = useState(true);

  const onBlur = () => setDisabled(true);

  const onIconClick = () => {
    setTimeout(() => inputRef.current!.focus(), 0);
    setDisabled(false);
  };

  return (
    <Input
      disabled={disabled}
      onBlur={onBlur}
      onChange={onChange}
      onIconClick={onIconClick}
      value={value}
      name="name"
      placeholder="Имя"
      icon="EditIcon"
      autoComplete="current-name"
      ref={inputRef}
    />
  );
}

export default CustomInput;
