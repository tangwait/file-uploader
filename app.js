require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { PrismaClient } = require('@prisma/client');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const router = require("./routes/router");
const path = require("node:path");


const app = express();
const prisma = new PrismaClient();

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'cats',
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore( prisma, { checkPeriod: 2 * 60 * 1000 }
    )
}));

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", router);

app.listen(3000, () => console.log('Server running on port 3000'));
