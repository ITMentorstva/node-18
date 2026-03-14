
const db = require("../services/db");

const Technology = {

    async getAll() {
        const [rows] = await db.execute("SELECT * FROM technologies");
        return rows;
    },

    create(name) {
        db.execute("INSERT INTO technologies (name) VALUES (?)", [name]);
    },

    delete(id) {
        db.execute("DELETE FROM technologies WHERE id = ?", [id]);
    }

};

module.exports = Technology;