/**
 * Workspace Flow — Schema Guard Middleware
 * @author Abdelfatah
 * Validates request body/query/params against a Joi schema object.
 * Usage: router.post('/', schemaGuard({ body: mySchema }), controller)
 */

const HttpException = require('../exceptions/HttpException');

const schemaGuard = (schemaMap) => {
  return (req, _res, next) => {
    const validationErrors = [];

    for (const segment in schemaMap) {
      const { error } = schemaMap[segment].validate(req[segment], {
        abortEarly: false,
        allowUnknown: false,
      });

      if (error) {
        const messages = error.details.map((d) => d.message.replace(/['"]/g, ''));
        validationErrors.push(...messages);
      }
    }

    if (validationErrors.length > 0) {
      return next(HttpException.badRequest('Validation failed', validationErrors));
    }

    next();
  };
};

module.exports = schemaGuard;
