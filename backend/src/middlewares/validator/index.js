const Ajv = require('ajv');
const { Context } = require('../../helpers');
const { ALLOWED_REQUEST_PROPS } = require('../../constants');
const { paginationQuerySchema } = require('./schemas');

const validate =
  (validateRequest = {}, { allErrors = true, strict = false } = {}) =>
  (req, res, next) => {
    const ajv = new Ajv({ allErrors, strict });
    const ctx = new Context(req, res);
    const generalValidateRequest = { ...validateRequest };
    const validateRequestProps = Object.keys(generalValidateRequest);
    const errors = [];

    if (
      !validateRequestProps.every(prop =>
        Object.values(ALLOWED_REQUEST_PROPS).includes(prop)
      )
    ) {
      throw new Error('Unexpected validate request properties');
    }

    if (validateRequest.pagination === true) {
      generalValidateRequest.pagination = paginationQuerySchema;
    }

    if (validateRequest.sorter === true) {
      generalValidateRequest.sorter = {};
    }

    validateRequestProps.forEach(prop => {
      const schema = generalValidateRequest[prop];
      const data = ctx.getRequest(prop);

      ajv.validate(schema, data);

      if (ajv.errors) {
        errors.push(ajv.errorsText(ajv.errors, { dataVar: prop }));
      }
    });

    if (errors.length) {
      ctx.sendBadRequestError('Schema validation failed.', errors);
    }

    return next();
  };

module.exports = validate;
