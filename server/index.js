const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const your_secret_key = "lsndlfniownenflw"

// Middleware to verify JWT token

// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]

//     if (token == null) return res.status(401).json({ message: 'Token is not provided.' })

//     jwt.verify(token, your_secret_key, (err, user) => {
//         if (err) return res.status(403).json({ message: 'Token is not valid.' })
//         req.user = user
//         next()
//     })
// } 

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    preflightContinue : true,
    credentials: true,
    // options: {
    //     sameSite: 'none',
    //     secure: true
    // }
}))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
mongoose.connect('mongodb://127.0.0.1:27017/users')


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const newUser = {
        name: name,
        email: email,
        password: hashedPassword,
    };

    UserModel.create(newUser)
        .then(usersPwd => res.json(usersPwd))
        .catch(err => res.json(err));
});


app.post('/login', (req, res) => {

    const { email, password } = req.body;

    UserModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                res.json("Invalid Credentials! Try Again");
            } else { 
                console.log(user)
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        console.log("Password Mismatch")
                    };
                    if (isMatch) {
                        console.log("password match")
                        const token = jwt.sign(
                            { email: user.email, id: user._id, name: user.name },
                            your_secret_key,
                            {});
                                res.cookie('token', token, { path: '/', sameSite: 'Lax' }).json("Success");
                    } else {
                        res.json("Invalid Credentials! Try Again");
                    }
                })
            }
                })
            
        
        .catch(err => {
            console.log(err);
            res.status(500).json("Oops! An error occurred");
        });
});



app.get('/dashboard', (req, res) => {
    const { token } = req.cookies;
    console.log('Token:', token);
    if(token){
        jwt.verify(token, your_secret_key, async (err, decoded) => {
            if (err) {
                console.error('JWT verification error:', err);
                return res.status(403).json({ message: 'Invalid token' });
            }
            try {
                const user = await UserModel.findById(decoded.id);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json({ name: user.name, email: user.email, id: user._id });
            } catch (err) {
                console.error('Database error:', err);
                res.status(500).json({ message: 'Server error' });
            }
        });
    } else{
        res.json(null)

    }
})

app.post('/logout', (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out successfully' });

});

const port = 3001;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

