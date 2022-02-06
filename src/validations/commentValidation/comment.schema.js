import joi from 'joi'

export const commentSchema = joi.object({
  description: joi.string().max(200).required().empty(),
});
