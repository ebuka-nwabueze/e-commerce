import express from 'express'
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import authRouter from "./routes/admin/auth.js";

const app = express();

app.use(express.static('public'))
// ensures all requests gets parsed for middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["Ghshey#%780=[]P$ssY"],
  })
);
app.use(authRouter)


app.listen(3000, () => {
  console.log("Listening");
});
