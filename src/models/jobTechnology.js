
const db = require("../services/db");

const JobTechnology = {

    create(jobId, technologyId) {
        db.execute("INSERT INTO job_technologies (job_id, technology_id) VALUES (?, ?)", [jobId, technologyId]);
    }

};

module.exports = JobTechnology;