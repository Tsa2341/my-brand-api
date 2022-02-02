import joi from 'joi'

export const querySchema = joi.object({
    description: joi.string().required().empty(),
    location: joi.string().required().empty(),
})