import joi from 'joi'

export const querySchema = joi.object({
  fullname: joi.string().required().empty(),
  email: joi.string().email().required().empty(),
  description: joi.string().required().empty(),
  location: joi.string().required().empty(),
});

