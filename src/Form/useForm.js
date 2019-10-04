import { useState } from 'react';

import validator from './validate';

const useForm = ({ initialValues, schema }) => {
  const [values, setValues] = useState({ ...initialValues, meta: { dirty: false, touched: false } });
  const [formErrors, setFormErrors] = useState({});

  const validate = validator(schema);

  const initField = name => setValues(prevValues => ({ ...prevValues, [name]: '' }));

  const onChange = (name, value, options) => {
    const { status, ...message } = validate(name, value, options || values);
    setFormErrors(prev => ({ ...prev, [name]: message[name] }));
    setValues(prev => ({ ...prev, [name]: value, meta: { touched: true, dirty: true } }));
  };

  const isValidForm = () => Object.keys(values).reduce((acc, field) => {
    const { status, ...message } = validate(field, values[field], values);
    if (typeof status === 'boolean') {
      setFormErrors(prev => ({ ...prev, [field]: message[field] }));
      return [...acc, status];
    }
    return [...acc];
  }, []).every(e => e);

  return {
    values,
    formErrors,
    onChange,
    initField,
    setValues,
    isValid: isValidForm,
  };
};

export default useForm;
