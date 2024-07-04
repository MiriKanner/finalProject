import Joi from 'joi';
import moment from 'moment';

const userSignupSchema = Joi.object({
  nickname: Joi.string().min(2).required(),
  username: Joi.string().min(3).max(15).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(4).max(20).required(),
  birthday: Joi.date().max(moment().subtract(18, 'years').toDate()).required()
});

const childSchema = Joi.object({
  username: Joi.string().min(3).max(15).required(),
  usernameParent:Joi.string().min(3).max(15).required(),
  birthday:Joi.date().max(moment().subtract(18, 'years').toDate()).required()
});

const userLoginSchema = Joi.object({
  username: Joi.string().min(3).max(15).required(),
  password: Joi.string().min(4).max(20).required(),
});

const newAlbum = Joi.object({
  name: Joi.string().min(2).required(),
  childUserName: Joi.string().min(3).max(15).required(),
  image: Joi.any()
})

const newChild = Joi.object({
  nickname: Joi.string().min(2).required(),
  username: Joi.string().min(3).max(15).required(),
  birthday: Joi.date().required(),
  idparent:Joi.number().required()
})

const childSignupSchema=  Joi.object({
  username: Joi.string().min(3).max(15).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(4).max(20).required(),
});

export { userSignupSchema, userLoginSchema, newAlbum ,newChild,childSignupSchema,childSchema}