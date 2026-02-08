
const db = require('../services/db');
const bcrypt = require('bcrypt');
const {hash} = require("bcrypt");

module.exports = {

    login: async (req, res) => {

        const { email, password } = req.body;

        const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

        if(rows.length < 1) {
            return res.send("This email doesn't exist in our database");
        }

        const user = rows[0];

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword) {
            return res.send("Invalid password!");
        }

        req.session.userId = user.id;
        req.session.loggedIn = true;

        res.send("Success");
    },

    register: async (req, res) => {
        const { name, email, password } = req.body;

        const [rows] = await db.execute("SELECT id FROM users WHERE email = ?", [email]);

        if(rows.length >= 1) {
            return res.send("This email is already taken!");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

        req.session.userId = result.insertId;
        req.session.loggedIn = true;

        res.send("Works");
    },

    logout: (req, res) => {
        req.session.destroy( () => {
            res.redirect('/');
        });
    },

};