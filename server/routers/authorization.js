
const Router = require('express');
const router = new Router();
const searchController = require('../controllers/authorization');

router.post('/',searchController.login);

module.exports = router;