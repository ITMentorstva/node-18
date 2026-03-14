
const db = require("../services/db");

const Company = {

    async getAll() {
        const [rows] = await db.execute("SELECT * FROM companies");
        return rows;
    },

    create(name) {
        db.execute("INSERT INTO companies (name) VALUES (?)", [name]);
    },

    delete(id) {
        db.execute("DELETE FROM companies WHERE id = ?", [id]);
    }

};

module.exports = Company;