const Router = require('express');
const router = new Router();
const todoController = require('../controllers/todo');

router.get('/',todoController.getTodoList);
router.post('/',todoController.createTodo);
router.put('/:id',todoController.updateTodoList);

module.exports = router;