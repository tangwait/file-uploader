require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const router = require("./routes/router");
const path = require("node:path");
const prisma = require('./prismaClient');
const flash = require('connect-flash');


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'cats',
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore( prisma, { checkPeriod: 2 * 60 * 1000 }
    )
}));

app.use(flash());
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
})

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", router);

app.listen(3000, () => console.log('Server running on port 3000'));

