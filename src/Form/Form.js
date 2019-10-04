import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import useForm from './useForm';
import FormContext from './FormContext';

const Form = React.forwardRef(({ initialValues, children, onSubmit, schema }, ref) => {
  const {
    values,
    formErrors,
    onChange,
    isValid,
    initField,
    setValues,
  } = useForm({ initialValues, schema });

  useEffect(() => {
    setValues(prev => ({ ...prev, ...initialValues }));
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...values, isValid: isValid() });
  };

  return (
    <FormContext.Provider value={{ values, formErrors, onChange, initField }}>
      <form onSubmit={handleSubmit} ref={ref}>
        {children && children}
      </form>
    </FormContext.Provider>
  );
});

Form.defaultProps = {
  onSubmit: () => {},
  initialValues: {},
  schema: {},
  children: null,
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.shape(),
  schema: PropTypes.shape(),
  children: PropTypes.shape(),
};

export default React.memo(Form);
