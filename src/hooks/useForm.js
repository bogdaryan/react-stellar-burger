import { useState } from "react";

const useForm = (initialState) => {
  const [formData, setValues] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((state) => ({ ...state, [name]: value }));
  };

  return {
    formData,
    handleChange,
  };
};

export default useForm;
