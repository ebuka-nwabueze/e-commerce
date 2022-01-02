import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { repo } from "./repositories/users.js";

const app = express();

// ensures all requests gets parsed for middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["Ghshey#%780=[]P$ssY"],
  })
);

app.get("/signup", (req, res) => {
  res.send(`
        <div>
            Your id is : ${req.session.userId}
            <form method="POST">
                <input type="email" name="email" placeholder="email">
                <input type="password" name="password" placeholder="password">
                <input type="password" name="passwordConfirmation" placeholder="email">
                <button type="submit">Sign Up</button>
            </form>
        </div>
    `);
});

app.post("/signup", async (req, res) => {
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

app.get("/signout", (req, res) => {
  req.session = null;
  res.send("You have been signed out");
});

app.get("/signin", (req, res) => {
  res.send(`
    <div>
        <form method="POST">
            <input type="email" name="email" placeholder="email">
            <input type="password" name="password" placeholder="password">
            <button type="submit">Sign In</button>
        </form>
    </div>
`);
});

app.post("/signin", async (req, res) => {
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
app.post("/signin", async (req, res) => {
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

app.listen(3000, () => {
  console.log("Listening");
});
