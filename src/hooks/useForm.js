import { useState } from "react";

const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((state) => ({ ...state, [name]: value }));
  };

  return {
    values,
    handleChange,
  };
};

export default useForm;
