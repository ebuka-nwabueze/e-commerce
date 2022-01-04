import layout from "../layout.js";
import { getErrors } from "../../helper.js"


export default ({ req, errors }) => {
  return layout({
    content: `
    <div>
        <div>
        <a href="http://localhost:3000/signin">Sign IN</a>
        <a href="http://localhost:3000/signout">Sign OUT</a>
        </div>

        Your id is : ${req.session.userId}
        <form method="POST">
            <input type="email" name="email" placeholder="email">
            ${getErrors(errors,"email")}
            <input type="password" name="password" placeholder="password">
            ${getErrors(errors,"password")}
            <input type="password" name="passwordConfirmation" placeholder="passwordConfirmation">
            ${getErrors(errors,"passwordConfirmation")}
            <button type="submit">Sign Up</button>
        </form>
    </div>
    `,
    title: `Sign UP`,
  });
};
