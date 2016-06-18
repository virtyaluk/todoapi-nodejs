const should = require('should'),
    request = require('supertest'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    Todo = mongoose.model('Todo'),
    agent = request.agent(app);

describe('Todo CRUD integration test', function() {
    describe('Get all Todo', function() {
        before(function(done) {
            const newTodo = { todo: 'Todo from hooks' };

            agent
                .post('/api/todos')
                .end(() => { done(); }); 
        });
        
        it('should get status equal success and array of todo', function(done) {
            agent
                .get('/api/todos')
                .expect(200)
                .end((err, res) => {
                    res.body.status.should.equal(true);
                    done();
                });
        });
    });

    describe('Post a Todo', function () {
		it('Should allow post to post a Todo and return _id', function (done) {
			const params = { todo: 'Todo fro testing' };

			agent
			    .post('/api/todos')
			    .send(params)
			    .expect(200)
                .end((err, res) => {
                    res.body.todo.completed.should.equal(false);
                    res.body.todo.should.have.property('_id');
                    done();
                });
		});
	});
	
	describe('Delete a Todo', function () {
		let id = null;

		before(function(done) {
			const params = { todo: 'Todo from hooks to delete' };
			
            agent
                .post('/api/todos')
                .send(params)
                .end((err, res) => {
                    id = res.body.todo._id;
                    done();
                });
		});

		it('Should delete the Todo by _id', function (done) {
			agent
                .delete('/api/todos/'+id)
                .end((err, res) => {
                    res.body.status.should.equal(true);
                    done();
                });
		});
	});

	describe('Update a Todo', function () {
		let id = null;

		before(function (done) {
			const newTodo = { todo: 'Todo from hooks to update' };
			
            agent
                .post('/api/todos')
                .send(newTodo)
                .end((err, res) => {
                    id = res.body.todo._id;
                    done();
                });
		});

		it('Should update the completed status of Todo by _id to true', function (done) {
			const params = { completed: true };
			
            agent
                .put('/api/todos/' + id)
                .send(params)
                .end((err, res) => {
                    res.body.status.should.equal(true);
                    done();
                });
		});
	});
});