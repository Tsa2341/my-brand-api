import joi from 'joi'

export const commentSchema = joi.object({
  fullname: joi.string().required().empty(),
  description: joi.string().max(200).required().empty(),
});
