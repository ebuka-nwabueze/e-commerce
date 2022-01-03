import express from "express";
import { check, validationResult } from "express-validator";
import { repo } from "../../repositories/users.js";
import signUpTemplate from "../../views/admin/auth/signup.js";
import signInTemplate from "../../views/admin/auth/signin.js";
import {
  requireEmail,
  requirePassword,
  requirePasswordComfirmation,
  requireValidPassword,
  requireValidPasswordForUser,
} from "../../routes/admin/validators.js";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signUpTemplate({ req }));
});

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordComfirmation],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.send(signUpTemplate({ req, errors }));
    }

    //retrieve the submitted signup info
    const { email, password } = req.body;
    const user = await repo.create({ email, password });
    req.session.userId = user.id;

    res.send("Account created!!!");
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You have been signed out");
});

router.get("/signin", (req, res) => {
  res.send(signInTemplate({ req }));
});

router.post(
  "/signin",
  [requireValidPassword, requireValidPasswordForUser],
  async (req, res) => {
    const { email } = req.body;
    const errors = validationResult(req);
    console.log(errors);
    // if (!errors.isEmpty()) {
    //     res.send(signInTemplate({ req, errors }));
    // }
    const user = await repo.getOneBy({ email });
    req.session.userId = user.id;
    res.send("You have been signed in");
  }
);

// const authRouter =  router;

// console.log(validatorCheck)

export default router;
