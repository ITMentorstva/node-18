
module.exports = {
    showHome: (req, res) => {
        req.session.test = true;
        res.send("Hello world")
    },

    showLogin: (req, res) => {
        const error = req.session.error;
        req.session.error = null;

        res.render("login", {error});
    },

    showRegister: (req, res) => {
        const error = req.session.error;
        req.session.error = null;
        res.render("register", {error})
    }
};