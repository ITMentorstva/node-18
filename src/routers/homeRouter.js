
const router = require('express').Router();
const homeController = require("../controllers/homeController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get('/', homeController.showHome);
router.get('/home', homeController.showHome);


router.get('/login', authMiddleware.guest, homeController.showLogin);
router.get('/register', authMiddleware.guest, homeController.showRegister);

/**
 * Protected routes, auth only!
 */
router.get('/dashboard', authMiddleware.auth, homeController.showDashboard);
router.get('/settings', authMiddleware.auth, homeController.showSettings);

module.exports = router;