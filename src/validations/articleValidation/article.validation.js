import { articleSchema } from "./article.schema.js";

export const articleValidation = async (req, res, next) => {
  const value = articleSchema.validate(req.body);
  if (value.error) {
    console.log(
      "in article validations = ",
      value.error.details[0].message.replaceAll('"', "")
    );
    try {
      res.status(406).json({
        message: value.error,
      });
    } catch (error) {
      res.status(404).json({
        message: error,
      });
    }
  } else {
    next();
  }
}

