

module.exports = {

    saveErrorAndRedirect: (req, res, page, message) => {
        req.session.error = message;
        req.session.save( () => res.redirect(page) );
    }

};