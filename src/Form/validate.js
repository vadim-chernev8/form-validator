import isEmpty from 'lodash/isEmpty';

const validate = schema => (name, value, options = null) => {
  const { rules = {}, messages = {} } = schema[name] || {};
  const isValid = {};

  if (isEmpty(rules)) return {};

  for (let i = 0; i < Object.keys(rules).length; i++) {
    const rule = Object.keys(rules)[i];
    const validateField = rules[rule](value, options);

    if (!validateField) {
      isValid[name] = messages[rule];
      isValid.status = false;
      break;
    }
  }

  if (isEmpty(isValid)) {
    isValid[name] = '';
    isValid.status = true;
  }

  return isValid;
};

export default validate;
