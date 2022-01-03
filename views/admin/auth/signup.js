import layout from "../layout.js";

const errorView = (errors, inputTpye) =>{
    try {
        return errors.mapped()[inputTpye].msg;
    } catch (error) {
        return "";
    }
};

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
            ${errorView(errors,"email")}
            <input type="password" name="password" placeholder="password">
            ${errorView(errors,"password")}
            <input type="password" name="passwordConfirmation" placeholder="email">
            ${errorView(errors,"passwordConfirmation")}
            <button type="submit">Sign Up</button>
        </form>
    </div>
    `,
    title: `Sign UP`,
  });
};
