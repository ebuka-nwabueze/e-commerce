//external import
import express from "express";
import { check, validationResult } from "express-validator";

// internal import
import { handleErrors } from "./middlewares.js";
import { repo } from "../../repositories/users.js";
import signUpTemplate from "../../views/admin/auth/signup.js";
import signInTemplate from "../../views/admin/auth/signin.js";
import {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireValidEmail,
  requireValidPasswordForUser,
} from "../../routes/admin/validators.js";

const router = express.Router();

router.get("/signup", (req, res) => {
  return res.send(signUpTemplate({ req }));
});

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmation],
  handleErrors(signUpTemplate),
  async (req, res) => {
    //retrieve the submitted signup info
    const { email, password } = req.body;
    const user = await repo.create({ email, password });
    req.session.userId = user.id;

    res.redirect("/admin/products");
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You have been signed out");
});

router.get("/signin", (req, res) => {
  res.send(signInTemplate({}));
});

router.post(
  "/signin",
  [requireValidEmail, requireValidPasswordForUser],
  handleErrors(signInTemplate),
  async (req, res) => {
    // const errors = validationResult(req);
    // console.log(errors);
    // if (!errors.isEmpty()) {
    //     return res.send(signInTemplate({ errors }));
    // }
    const { email } = req.body;
    const user = await repo.getOneBy({ email });
    req.session.userId = user.id;
    res.redirect("/admin/products");
  }
);

export default router;
