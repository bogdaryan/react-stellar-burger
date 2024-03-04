import { useState } from "react";
import { ChangeEvent } from "react";
import { TUseForm } from "../types/types";

const useForm = (initialState: TUseForm) => {
  const [formData, setValues] = useState(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((state: TUseForm) => ({ ...state, [name]: value }));
  };

  return {
    formData,
    handleChange,
  };
};

export default useForm;
