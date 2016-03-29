import { BASE_URL } from '../config';

export function validateData(data, validationScheme = {}) {
  let isValid = true;
  const errors = {};

  for (const [validationKey, validationRules] of Object.entries(validationScheme)) {
    const fieldErrors = [];

    for (const singleValidationRule of validationRules) {
      const error = singleValidationRule(data[validationKey] || '');

      if (!!error) {
        fieldErrors.push(error);
      }
    }

    if (fieldErrors.length > 0) {
      errors[validationKey] = fieldErrors;
      isValid = false;
    }
  }

  return {isValid, errors};
}

export function getUrl(path) {
  return `${BASE_URL}/${path}`;
}