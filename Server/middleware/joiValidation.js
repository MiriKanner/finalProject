export const validate = (schema) => {
  return (req, res, next) => {
    const valid = schema.validate(req.body);
    if (valid.error)
      return next({ statusCode: 400, message: valid.error.message })
    next();
  };
};