import joi from 'joi'

export const querySchema = joi.object({
    description: joi.string().required().empty(),
    location: joi.string().required().empty(),
<<<<<<< HEAD
})

=======
})
>>>>>>> 1643e92 (ft: add authentication and validation on required routes)
