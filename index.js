import express from 'express'
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import authRouter from "./routes/admin/auth.js";
import productRouter from "./routes/admin/products.js";

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
app.use(productRouter)


app.listen(3000, () => {
  console.log("Listening");
});
