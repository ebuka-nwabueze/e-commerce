import { check } from "express-validator";
import { repo } from "../../repositories/users.js";



 const validatorCheck =  { requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .custom(async (email) => {
      const existingUser = await repo.getOneBy({ email });
      if (existingUser) {
        throw new Error("Email already in use");
      }
    }),
    requirePassword: check("password").trim().isLength({ min: 4, max: 20 }),
    requirePasswordComfirmation: check("passwordConfirmation").trim().isLength({ min: 4, max: 20 })
    .custom((passwordConfirmation, { req })=>{
        if(req.body.password !== passwordConfirmation){
            throw new Error("Password does not match");
        }
    })
};
// console.log(validatorCheck)
// export { validatorCheck.requireEmail as requireEmail };

export {validatorCheck}
