
const db = require("../services/db");
const bcrypt = require("bcrypt");

const User = {

    async create(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
        return result.insertId;
    },

    async getByEmail(email) {
        const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        return rows;
    }

};

module.exports = User;