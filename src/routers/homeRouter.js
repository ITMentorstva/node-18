
const router = require('express').Router();
const homeController = require("../controllers/homeController");

router.get('/', homeController.showHome);
router.get('/home', homeController.showHome);
router.get('/login', homeController.showLogin);
router.get('/register', homeController.showRegister);

module.exports = router;