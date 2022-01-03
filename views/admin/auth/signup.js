import layout from "../layout.js";
export default ({ req }) => {
  return layout({
    content: `
    <div>
        <div>
        <a href="http://localhost:3000/signin">Sign IN</a>
        </div>

        Your id is : ${req.session.userId}
        <form method="POST">
            <input type="email" name="email" placeholder="email">
            <input type="password" name="password" placeholder="password">
            <input type="password" name="passwordConfirmation" placeholder="email">
            <button type="submit">Sign Up</button>
        </form>
    </div>
    `,
    title: `Sign UP`,
  });
};
