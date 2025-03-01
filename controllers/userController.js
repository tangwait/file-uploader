const passport = require('passport');
const prismaFunction = require('../models/userModel'); 
const bcrypt = require('bcryptjs');
require("../passportConfig");

function loadHomepage(req, res) {
    res.render("index");
};

function loadLogin(req, res) {
    res.render("login");
};

function loadRegister(req, res) {
    res.render("register");
};

function logOut(req, res) {
    req.logout(err => {
        if (err) return next(err);
        res.redirect('/');
    });
};

async function registerUser(req, res) {
    try {
        const { first_name, last_name, email, password } = req.body;
    
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prismaFunction.createUser(first_name, last_name, email, hashedPassword);
        console.log(user);
        res.redirect('/login');
    } catch (error) {
        console.error("Cannot register user:", error);
        res.status(500).send('Cannot register user');
    }
}

function loginUser(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            req.flash('error', info.message);
            return res.redirect('/login');
        }

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.redirect('/dashboard');
        });
    }) (req, res, next);
}

async function loadDashboard(req, res) {
    if (!req.user) {
        console.log("can't find user (dashboard)")
        return res.redirect('/login');
    }

    try {
        const userId = req.user.userId
        const files = await prismaFunction.getUserFiles(userId)
        res.render('dashboard', { user: req.user, files });
    } catch (error) {
        console.error("Error loading dashboard:", error);
        res.status(500).send("Server error");
    }
}



module.exports = {
    loadHomepage,
    loadLogin,
    loadRegister,
    logOut,
    registerUser,
    loginUser,
    loadDashboard
}