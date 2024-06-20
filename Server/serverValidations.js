import Joi from 'joi';

const addUserSchema = Joi.object({
  nickname: Joi.string().min(2).required(),
  username: Joi.string().min(5).max(15).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(4).max(20).required(),
  birthday: Joi.date().required()
});

const minUserSchema = Joi.object({
  username: Joi.string().min(5).max(15).required(),
  password: Joi.string().min(4).max(20).required(),
});

const newAlbum = Joi.object({
  name: Joi.string().min(2).required(),
  childUserName: Joi.string().min(5).max(15).required(),
  creationdate: Joi.date()
})

export { addUserSchema, minUserSchema, newAlbum }