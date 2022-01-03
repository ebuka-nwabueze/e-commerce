import express from "express";
import { check } from "express-validator";
import { repo } from "../../repositories/users.js";
import signUpTemplate from "../../views/admin/auth/signup.js";
import signInTemplate from "../../views/admin/auth/signin.js";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signUpTemplate({ req }));
});

router.post("/signup", async (req, res) => {
  //retrieve the submited singup info
  const { email, password, passwordConfirmation } = req.body;

  // check if the user exists using the submitted email, by call the repo instance imported.
  const existingUser = await repo.getOneBy({ email });

  if (existingUser) {
    return res.send("Email already in use");
  }
  if (password !== passwordConfirmation) {
    return res.send("Password does not match");
  }

  const user = await repo.create({ email, password });

  req.session.userId = user.id;

  res.send("Account created!!!");
});

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You have been signed out");
});

router.get("/signin", (req, res) => {
  res.send(signInTemplate({ req }));
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await repo.getOneBy({ email });
  if (!user) {
    return res.send("Email address not found");
  }

  const ValidPassword = await repo.comparePasswords(user.password, password);

  if (!ValidPassword) {
    return res.send("Password Incorrect. Try again!!!");
  }
  req.session.userId = user.id;
  res.send("You have been signed in");
});

// const authRouter =  router;

export default router;
