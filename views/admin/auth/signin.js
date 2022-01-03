export default ({ req }) => {
    return `
    <div>
        <div>
        <a href="http://localhost:3000/signup">Sign UP</a>
        </div>
        <form method="POST">
            <input type="email" name="email" placeholder="email">
            <input type="password" name="password" placeholder="password">
            <button type="submit">Sign In</button>
        </form>
    </div>
`;
};