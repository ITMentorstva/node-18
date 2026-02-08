
module.exports = {
    showHome: (req, res) => {
        req.session.test = true;
        res.send("Hello world")
    },

    showLogin: (req, res) => {
        res.render("login");
    },

    showRegister: (req, res) => {
        res.render("register")
    }
};