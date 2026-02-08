
const express = require('express');
const app = express();
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const path = require("path");

require('dotenv').config();

require('./src/controllers/homeController');
require('./src/controllers/userController');

express.Router();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const userRouter = require('./src/routers/userRouter');
const homeRouter = require('./src/routers/homeRouter');
const authRouter = require('./src/routers/authRouter');
const adminRouter = require('./src/routers/adminRouter');

app.use(session({
    store: new FileStore({
        path: path.join(__dirname, 'sessions')
    }),
    secret: '123456789',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}));


/**
 *  DB:
    -> "role" -> default: "user", "admin" (NEMOJTE KORISTIT ENUM U BAZI!)

    REG:
    -> Kod kreiranja korisnika ako unese sifru "ADMIN_SIFRA" onda mu se kreira admin role u bazi

    -> Napraviti router za admine, napraviti middleware koji ce biti za SVE admin rute koji proverava:
        -> Da sam ulogovan
        -> Da imam role "admin"
        -> U suprotnom saljemo korisnika na glavnu stranicu
        -> Napraviti glavnu /admin stranicu kako bi testirali funkcionalnosti iznad
 */

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/', homeRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Server running on http://localhost:3000");
});

