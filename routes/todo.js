const express = require('express'); 
const router = express.Router();
const controller = require('../controller/Ctodo');

//GET /api/todos - show all todoso (Read)
router.get('/todos',controller.readTodos)

//POST /api/todos - create a new todo(Create)
router.post('/todos', controller.createTodo)

//PATCH /api/todoId - edit a specific todo (update)
router.patch('/todos/:todoId',controller.updateTodo);

//DELETE /api/

router.delete('/todos/:todoId', controller.deleteTodo)

module.exports = router;

