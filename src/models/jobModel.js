
const db = require("../services/db");

const Job = {

    async getAll() {
        const [ rows ] = await db.execute("SELECT * FROM jobs");
        return rows;
    },

    async create(data) {
        const sql = `INSERT INTO jobs (user_id, company_id, title, salary, due_date) VALUES (?, ?, ?, ?, ?)`;

        const values = [
            data.user_id,
            data.company_id,
            data.title,
            data.salary,
            data.due_date
        ];

        const [result] = await db.execute(sql, values);

        return result.insertId;
    }
};

module.exports = Job;