
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
    },

    showDashboard: (req, res) => {
        res.render("dashboard")
    },

    showSettings: (req, res) => {
        res.render("settings");

    }
};

/**
 *
 *  -> browser dolazi na /settings
 *
 *      -> AuthMiddleware
 *          -> Da li je ovaj korisnik ulogovan?
 *
 *              -> Ako nije prosledi ga na /login
 *
 *              -> ako jeste ulogovan, pusti ga dalje
 *                  -> userController->showSettings
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */