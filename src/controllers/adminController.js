
const Company = require("../models/companyModel");
const Technology = require("../models/technologyModel");
const Job = require("../models/jobModel");
const User = require("../models/userModel");
const JobTechnology = require("../models/jobTechnology");
const { validationResult } = require('express-validator');

module.exports = {

    showCompanies: async (req, res) => {
        res.render("admin/companies", {
            companies: await Company.getAll()
        });
    },

    showTechnologies: async (req, res) => {
        res.render("admin/technologies", {
            technologies: await Technology.getAll()
        });
    },

    showJobs: async (req, res) => {
        res.render("admin/jobs", {
            jobs: await Job.getAll(),
            users: await User.getAll(),
            companies: await Company.getAll(),
            technologies: await Technology.getAll(),
            errors: []
        });
    },

    createCompany: (req, res) => {
        Company.create(req.body.name);
        return res.redirect("/admin/companies");
    },

    createTechnology: (req, res) => {
        Technology.create(req.body.name);
        return res.redirect("/admin/technologies");
    },

    createJob: async (req, res) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.render("admin/jobs", {
                jobs: await Job.getAll(),
                users: await User.getAll(),
                companies: await Company.getAll(),
                technologies: await Technology.getAll(),
                errors: errors.array()
            });
        }

        const job = {
            user_id: req.body.user_id,
            company_id: req.body.company_id,
            title: req.body.title,
            salary: req.body.salary || null,
            due_date: req.body.due_date
        };

        const jobId = await Job.create(job);

        req.body.technology.forEach(technology => {
            JobTechnology.create(jobId, technology);
        })

        return res.send("Works!");
    },


    deleteTechnology: (req, res) => {
        const { id } = req.params;
        Technology.delete(id);
        return res.redirect("/admin/technologies");
    },

    deleteCompany: (req, res) => {
        const { id } = req.params;
        Company.delete(id);
        return res.redirect("/admin/companies");
    }

};