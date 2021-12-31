import express from 'express';
import bodyParser from 'body-parser'

const app = express();

// ensures all requests gets parsed for middleware
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    res.send(`
        <div>
            <form method="POST">
                <input type="email" name="email" placeholder="email">
                <input type="password" name="password" placeholder="password">
                <input type="password" name="passwordConfirmation" placeholder="email">
                <button type="submit">Sign Up</button>
            </form>
        </div>
    `);
});

app.post('/', (req,res)=>{
   console.log(req.body)
    res.send('Account created!!!')
});

app.listen(3000,()=>{
    console.log('Listening')
});

