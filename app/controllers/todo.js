module.exports = function(Todo) {
    return {
        PostTodo: function(req, res, next) {
            const newTodo = new Todo(req.body);

            newTodo.save(function(err, todo) {
                if (err) {
                    res.json({ status: false, error: err.message });
                    
                    return;
                }

                res.json({ status: true, todo: todo });
            });
        },

        GetTodo: function(req, res, next) {
            Todo.find(function(err, todos) {
                if (err) {
                    res.json({ status: false, error: 'Something went wrong' });

                    return;
                }

                res.json({ status: true, todo: todos });
            });
        },

        UpdateTodo: function(req, res, next) {
            const completed = req.body.completed;

            Todo.findById(req.params.todo_id, function(err, todo) {
                if (err) {
                    res.json({ status: false, error: 'Status not updated' });
                }

                res.json({ status: true, message: 'Status updated successfully' });
            });
        },

        DeleteTodo: function(req, res, next) {
            Todo.remove({ _id: req.params.todo_id }, function(err, todos) {
                if (err) {
                    res.json({ status: false, error: 'Deleting todo is nit successfully' });
                }

                res.json({ status: true, message: 'Todo deleted successfully' });
            });
        }
    };
};