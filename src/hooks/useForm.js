import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formStateErrors, setformStateErrors] = useState({});

  useEffect(() => {
    runValidators();
  }, [formState]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({ ...formState, [name]: value });
  };

  const runValidators = (name, value) => {
    const newErrorState = {};

    for (const formField of Object.keys(formState)) {
      const [isValid, errorMessage] = formValidations[formField];
      newErrorState[`${formField}Error`] = isValid(formState[formField])
        ? null
        : errorMessage;
    }

    setformStateErrors(newErrorState);
  };

  const isFormValid = useMemo(() => {
    return Object.keys(formStateErrors).every(
      (error) => formStateErrors[error] === null
    );
  }, [formStateErrors]);

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    isFormValid,
    ...formStateErrors,
    formStateErrors,
  };
};
