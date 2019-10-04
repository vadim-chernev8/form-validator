import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import FormContext from './FormContext';

const Field = ({ name, component: FieldComponent, errorComponent: Error, ...props }) => {
  const { values, formErrors, onChange, initField } = useContext(FormContext);

  useEffect(() => { initField(name); }, [name]);

  const { validate = null, ...field } = props;

  const handleChange = (value) => {
    onChange(name, value, validate);
  };

  return (
    <Fragment>
      <FieldComponent value={values[name]} id={`id-${name}`} onChange={handleChange} {...field} />
      <span className="form--error" >{formErrors[name]}</span>
    </Fragment>
  );
};

Field.defaultProps = {
  errorComponent: null,
  validate: null,
};

Field.propTypes = {
  name: PropTypes.string.isRequired,
  component: PropTypes.shape().isRequired,
  errorComponent: PropTypes.shape(),
  validate: PropTypes.shape(),
};

export default Field;
