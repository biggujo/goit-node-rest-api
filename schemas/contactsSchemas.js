import Joi from 'joi';

const create = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(6).required(),
});

const update = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().min(6),
}).min(1).messages({
  'object.min': 'Body must have at least {{#limit}} field',
});

const ContactsSchemas = {
  create,
  update,
};

export default ContactsSchemas;
