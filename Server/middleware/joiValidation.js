export const validate = (schema) => {
  return (req, res, next) => {
    const valid = schema.validate(req.body);
    if (valid.error) {
      /*********** send to log errors */
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};