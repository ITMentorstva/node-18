
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

app.use(session({
    store: new FileStore(),
    secret: '123456789',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}));

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/', homeRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Server running on http://localhost:3000");
});

