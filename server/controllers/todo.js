const {Todo} = require('../models/models');

class TodoController {

    async createTodo(req, res) {
        const {name, email, text} = req.body;
        const {page = 0, type = 'id', direction = 'ASC'} = req.query;
        const todo = Todo.build({name, email, text});
        await todo.save();
        const data = await getTodoFromDataBase(type, direction, page);
        res.send(data);
    }

    async getTodoList(req, res) {
        const {page = 0, type = 'id', direction = 'ASC'} = req.query;
        const data = await getTodoFromDataBase(type, direction, page);
        res.send(data);
    }

    async updateTodoList(req, res) {
        const {id, text, isready, ischanged} = req.body;
        const {page = 0, type = 'id', direction = 'ASC'} = req.query;
        await Todo.update({
                text,
                ischanged,
                isready,
            },
            {
                where: {
                    id: id
                }
            }
        );
        const data = await getTodoFromDataBase(type, direction, page);
        res.send(data);
    }
}

async function getTodoFromDataBase(type, direction, page) {
    const offset = page * 3;
    const data = await Todo.findAndCountAll({
        limit: 3,
        offset: offset,
        attributes: ['id', 'name', 'email', 'text', 'ischanged', 'isready'],
        order: [
            [type, direction]
        ]
    });
    data.totalPages = Math.ceil(data.count / 3);
    data.currentPage = Number(page);
    return data;
}

module.exports = new TodoController();