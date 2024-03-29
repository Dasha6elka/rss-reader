import { useCallback, useEffect, useState } from "react";

function useForm(stateSchema, validationSchema = {}, callback = () => undefined) {
  const [state, setState] = useState(stateSchema);
  const [disable, setDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  const validateState = useCallback(() => {
    return Object.keys(validationSchema).some(key => {
      const isInputFieldRequired = validationSchema[key].required;
      const stateValue = state[key].value;
      const stateError = state[key].error;
      return (isInputFieldRequired && !stateValue) || stateError;
    });
  }, [state, validationSchema]);

  useEffect(() => {
    setDisable(true);
  }, []);

  useEffect(() => {
    if (isDirty) {
      setDisable(validateState());
    }
  }, [state, isDirty, validateState]);

  const handleOnChange = useCallback(
    event => {
      setIsDirty(true);
      const name = event.target.name;
      const value = event.target.value;
      let error = "";
      if (validationSchema[name].required) {
        if (!value) {
          error = "Заполнение этого поля обазательно!";
        }
      }
      if (validationSchema[name].validator !== null && typeof validationSchema[name].validator === "object") {
        if (value && !validationSchema[name].validator.regEx.test(value)) {
          error = validationSchema[name].validator.error;
        }
      }
      setState(prevState => ({
        ...prevState,
        [name]: { value, error }
      }));
    },
    [validationSchema]
  );
  const handleOnSubmit = useCallback(
    event => {
      event.preventDefault();

      if (!validateState()) {
        callback(state);
      }
    },
    [state, callback, validateState]
  );
  return { state, disable, handleOnChange, handleOnSubmit };
}
export default useForm;
