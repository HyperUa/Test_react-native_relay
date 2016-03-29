/**
 * Validate and return error message
 *
 * @param {function} rule Rule of validation
 * @param {string} message
 * @param value
 * @returns {null|string}
 */
function validate(rule, message, value) {
  if (!rule(value)) {
    return (message.replace('%val%', value));
  }

  return null;
}

/**
 * Validation rule using regular expression
 *a
 * @param {RegExp|string} regExp
 * @param {string} message
 * @returns {null|string}
 */
function regExpValidation (regExp, message = 'Not valid') {
  return validate.bind(null, function (value) { return value.match(regExp); }, message);
}


export default {
  /**
   * Value should be numeric
   */
  Number: regExpValidation.bind(null, /^[0-9]\d*$/, 'This field should be numeric'),

  /**
   * Value is required
   */
  Required: function (message = 'This field is required') {
    return validate.bind(null, function (value) { return value === 0 || !!value; }, message);
  },

  /**
   * Value should be email
   */
  Email: regExpValidation.bind(
    null,
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
    'Invalid email address'
  ),

  /**
   * Value should meet requirement of regular expression
   */
  RegExp: regExpValidation,

  /**
   * Allow values more than minNumber
   */
  Min: function (minNumber, message = 'This field should be more than %min%') {
    return validate.bind(null, function (value) { return value >= minNumber; }, message.replace('%min%', minNumber));
  },

  /**
   * Allow values less than maxNumber
   */
  Max: function (maxNumber, message = 'This field should be less than %max%') {
    return validate.bind(null, function (value) { return value <= maxNumber; }, message.replace('%max%', maxNumber));
  },

  MaxLength: function(maxLength, message = 'You can type not more than %max%') {
    return validate.bind(null, function (value) { return value.length <= maxLength; }, message.replace('%max%', maxLength));
  },

  MinLength: function(minLength, message = 'Minimum length is %min%') {
    return validate.bind(null, function (value) { return value.length >= minLength; }, message.replace('%min%', minLength));
  },

  Equal: (equalValue, message) => validate.bind(null, (value) => value === equalValue, message),
};
