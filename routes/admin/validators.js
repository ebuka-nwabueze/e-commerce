import { check } from "express-validator";
import { repo } from "../../repositories/users.js";

const validatorCheck = {
  requireTitle: check("title")
    .trim()
    .isLength({ min: 4, max: 40 })
    .withMessage("must be between 4 and 20 characters"),

  requirePrice: check("price")
    .trim()
    .toFloat()
    .isFloat({ min: 1 })
    .withMessage("Must be a number greater than 1"),

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

  requirePasswordConfirmation: check("passwordConfirmation")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be be between 4 and 20 Characters")
    .custom((passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error("Password does not match");
      } else {
        return true;
        // this is placed here because even if the above evaluation does not return an error. it skips the if statement
        // because it raises an undefined, which results to an error.
        // it is best to return true to avoid the error
      }
    }),

  requireValidEmail: check("email")
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
        throw new Error("Check email and enter a correct password");
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
  requirePasswordConfirmation,
  requireValidEmail,
  requireValidPasswordForUser,
  requireTitle,
  requirePrice,
} = validatorCheck;
