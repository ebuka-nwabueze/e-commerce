import express from "express";
import { check, validationResult } from "express-validator";
import { repo } from "../../repositories/users.js";
import signUpTemplate from "../../views/admin/auth/signup.js";
import signInTemplate from "../../views/admin/auth/signin.js";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signUpTemplate({ req }));
});

router.post(
  "/signup",
  [
    check("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .custom(async (email) => {
        const existingUser = await repo.getOneBy({ email });
        if (existingUser) {
          throw new Error("Email already in use");
        }
      }),
    check("password").trim().isLength({ min: 4, max: 20 }),
    check("passwordConfirmation")
      .trim()
      .isLength({ min: 4, max: 20 })
      .custom((passwordConfirmation, { req }) => {
        if (req.body.password !== passwordConfirmation) {
          throw new Error("Password must match");
        }
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    //retrieve the submited singup info
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
