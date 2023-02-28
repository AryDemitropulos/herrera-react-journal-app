import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formStateErrors, setformStateErrors] = useState({});
  const [isClear, setIsClear] = useState(true);

  useEffect(() => {
    runValidators();
  }, [formState]);

  const onInputChange = ({ target }) => {
    !isClear || setIsClear(false);
    const { name, value } = target;
    setFormState({ ...formState, [name]: value });
  };

  const runValidators = (name, value) => {
    const newErrorState = {};

    for (const formField of Object.keys(formValidations)) {
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
    isClear
  };
};
