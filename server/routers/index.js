const Router = require('express');
const router = new Router();
const todo = require('./todo');
const authorization = require('./authorization');

router.use('/login', authorization);
router.use('/todo', todo);

module.exports = router;