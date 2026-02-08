
module.exports = {

    getUser: (req, res) => {
        res.send("TEST 123")
    },

    getUserById: (req, res) => {

        const { id } = req.params;

        res.send("This works "+id)
    }

};