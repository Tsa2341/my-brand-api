import { userSchema } from "./user.schema";

export const userValidation = async (req, res, next) => {
    const value = await userSchema.validate(req.body);
    if (value.error) {
        res
          .status(406)
          .json({ message: value.error.details[0].message.replace(/"/g, "") });
    } else {
        next();
    }
}

