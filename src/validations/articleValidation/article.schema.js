import joi from 'joi'

export const articleSchema = joi.object({
    title: joi.string().max(1000).required(),
    description: joi.string().required(),
})
