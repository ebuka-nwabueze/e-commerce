import { check } from "express-validator";
import { repo } from "../../repositories/users.js";

const validatorCheck = {
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (email) => {
      const existingUser = await repo.getOneBy({ email });
      if (existingUser) {
        throw new Error("Email already in use");
      }
    }),

  requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be be between 4 and 20 Characters"),

  requirePasswordComfirmation: check("passwordConfirmation")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be be between 4 and 20 Characters")
    .custom((passwordConfirmation, { req }) => {
      if (req.body.password !== passwordConfirmation) {
        throw new Error("Password does not match");
      }
    }),

  requireValidPassword: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must provide a valid email")
    .custom(async (email) => {
      const user = await repo.getOneBy({ email });
      if (!user) {
        throw new Error("Email address not found");
      }
    }),

  requireValidPasswordForUser: check("password")
    .trim()
    .custom(async (password, { req }) => {
      const user = await repo.getOneBy({ email: req.body.email });
      if (!user) {
        throw new Error("Password Incorrect. Try again!!!");
      }
      const ValidPassword = await repo.comparePasswords(
        user.password,
        password
      );

      if (!ValidPassword) {
        throw new Error("Password Incorrect. Try again!!!");
      }
    }),
};
// console.log(validatorCheck)
// export { validatorCheck.requireEmail as requireEmail };

// export {validatorCheck}
export const {
  requireEmail,
  requirePassword,
  requirePasswordComfirmation,
  requireValidPassword,
  requireValidPasswordForUser,
} = validatorCheck;
