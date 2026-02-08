
const db = require('../services/db');
const bcrypt = require('bcrypt');
const { saveErrorAndRedirect } = require("../helpers/sessionHelper");
const User = require("../models/userModel");

module.exports = {

    login: async (req, res) => {

        const { email, password } = req.body;

        const rows = User.getByEmail(email);

        if(rows.length < 1) {
            return saveErrorAndRedirect(req, res, "/login", "This email doesn't exist in our database");
        }

        const user = rows[0];

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword) {
            return saveErrorAndRedirect(req, res, "/login", "Invalid password");
        }

        req.session.userId = user.id;
        req.session.loggedIn = true;

        res.send("Success");
    },

    register: async (req, res) => {
        const { name, email, password } = req.body;

        const rows = User.getByEmail(email);

        if(rows.length >= 1) {
            return saveErrorAndRedirect(req, res, "/register", "This email is already taken.");
        }

        req.session.userId = User.create(name, email, password);
        req.session.loggedIn = true;

        res.send("Works");
    },

    logout: (req, res) => {
        req.session.destroy( () => {
            res.redirect('/');
        });
    },

};