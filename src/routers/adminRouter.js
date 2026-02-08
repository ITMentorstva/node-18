
const router = require('express').Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.admin, adminController.testAdminPage);

module.exports = router;