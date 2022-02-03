import { articleSchema } from "./article.schema.js";

export const articleValidation = async (req, res, next) => {
    const value = await articleSchema.validate(req.body);
    if (value.error) {
        res.status(406).json({
									error: 1,
									message: value.error.details[0].message.replaceAll('"', ""),
								});
    } else {
        next();
    }
}

