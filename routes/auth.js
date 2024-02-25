const express = require('express');
const router = express.Router();
const usermodel = require('./users').users;
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('index', { title: "Welcome" });
});

router.get('/register', (req, res) => {
    res.render('register', { title: "Register" });
});

router.get('/login', (req, res) => {
    res.render('login', { title: "Login" });
});

router.get('/logout', (req, res) => {
    req.session.isValid = 0;
    res.redirect('/');
});

router.post('/register', async (req, res) => {
    const { name, email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const checkUser = await usermodel.findOne({ username: username });
    const checkEmail = await usermodel.findOne({ email: email });

    if (checkUser) {
        return res.render('partials/error', { title: "Error", error: "Username already exists." });
    } else if (checkEmail) {
        return res.render('partials/error', { title: "Error", error: "Email already exists." });
    } else {
        const createdUser = usermodel.create({
            name: name,
            email: email,
            username: username,
            password: hashedPassword
        });

        if (createdUser) {
            req.session.isValid = 1;
            req.session.username = username;

            res.render('partials/success', { title: "Successful", msg: "Successfully registered.", location: "home" });
        } else {
            res.render('partials/error', { title: "Error", error: "Something went wrong." });
        }
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const checkUser = await usermodel.findOne({ username: username });

    if (checkUser) {
        const passwordMatch = await bcrypt.compare(password, checkUser.password);

        if (passwordMatch) {
            req.session.isValid = 1;
            req.session.username = username;

            res.redirect('home');
        }
        else {
            res.render('partials/error', { title: "Error", error: "Username & Password didn't match." });
        }
    }
    else {
        res.render('partials/error', { title: "Error", error: "Account is not existed." });
    }
});

module.exports = router;
