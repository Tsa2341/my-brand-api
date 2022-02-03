import { querySchema } from "./query.schema.js";


export const queryValidation = async (req, res, next) => {
    const value = await querySchema.validate(req.body);
    if (value.error) {
        res.status(406).json({
            error: 1,
            message: value.error.details[0].message.replaceAll("\"","")
        })
    } else {
        next();
    }
}
<<<<<<< HEAD

=======
>>>>>>> 1643e92 (ft: add authentication and validation on required routes)
