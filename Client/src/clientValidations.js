import Joi from 'joi';

const userSignupSchema = Joi.object({
  nickname: Joi.string().min(2).required(),
  username: Joi.string().min(5).max(15).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(4).max(20).required(),
  birthday: Joi.date().required()
});

const userLoginSchema = Joi.object({
  username: Joi.string().min(5).max(15).required(),
  password: Joi.string().min(4).max(20).required(),
});

const newAlbum = Joi.object({
  name: Joi.string().min(2).required(),
  childUserName: Joi.string().min(5).max(15).required()
})

const newChild = Joi.object({
  nickname: Joi.string().min(2).required(),
  username: Joi.string().min(5).max(15).required(),
  birthday: Joi.date().required(),
  idparent:Joi.number().required()
})
/*export function ValidateForm(schema,user) {
   return userSchema.validate(user)    
}*/
/*  import Joi from "joi";
import {schema} from '../../validationsSchemas.js'

validateForm = () => {
  // Create a Joi object schema from the schema object defined in the component
  const joiObjectSchema = Joi.object(schema);

  // Filter out empty values from the form data object
  const dataToBeValidated = Object.fromEntries(
    Object.entries(this.state.data).filter(([_, value]) => value !== "")
  );

  // Validate the form data against the Joi schema and collect any errors
  const { error } = joiObjectSchema.validate(dataToBeValidated, {
    abortEarly: false,
  });

  // Display the error message if there are any errors
  alert(error);
};*/

export { userSignupSchema, userLoginSchema, newAlbum ,newChild}