import { articleSchema } from "./article.schema.js";

export const articleValidation = async (req, res, next) => {
  const value = articleSchema.validate(req.body);
  if (value.error) {
    console.log(value);
    res.status(406).json({
      message: value.error.details[0].message.replaceAll('"', ""),
    });
  } else {
    next();
  }
}

