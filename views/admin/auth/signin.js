import layout from "../layout.js";
export default ({ req }) => {
  return layout({
    content: `
    <div>
        <div>
        <a href="http://localhost:3000/signup">Sign UP</a>
        <a href="http://localhost:3000/signout">Sign OUT</a>
        </div>
        <form method="POST">
            <input type="email" name="email" placeholder="email">
            <input type="password" name="password" placeholder="password">
            <button type="submit">Sign In</button>
        </form>
    </div>
`,
    title: `Sign IN`,
  });
};
