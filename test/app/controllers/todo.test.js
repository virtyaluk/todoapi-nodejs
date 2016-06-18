'use strict';

const should = require('should'),
    sinon = require('sinon'),
    mongoose = require('mongoose'),
    TodoModel = require('../../../app/models/todo');

require('sinon-mongoose');

describe('TodoController testing', function() {
    describe('Todo Post test', function() {
        it('should call `save` only once', function() {
            const saveStub = sinon.stub(),
                Book = function Book() {
                    this.save = saveStub;
                },
                req = { body: { todo: 'Test todo from mock' }},
                res = {},
                next = {},
                TodoController = require('../../../app/controllers/todo')(Book);

                TodoController.PostTodo(req, res, next);
                sinon.assert.calledOnce(saveStub);
        });

        it('should save todo', function(done) {
            const todoMock = sinon.mock(new TodoModel({ todo: 'Save new todo from mock' })),
                todo = todoMock.object;
            
            todoMock.expects('save').yields(null, 'SAVED');
            todo.save(function(err, result) {
                todoMock.verify();
                todoMock.restore();
                should.equal('SAVED', result, 'Test fails due to unexpected result');
                done();
            });
        });
    });

    describe('Get all Todo test', function() {
        it('should call find once', function(done) {
            const TodoMock = sinon.mock(TodoModel);

            TodoMock.expects('find').yields(null, 'TODOS');
            TodoModel.find(function(err, result) {
                TodoMock.verify();
                TodoMock.restore();
                should.equal('TODOS', result, 'Test fails due to unexpected result');
                done();
            });
        });
    });

    describe('Delete Todo test', function() {
        it('should delete todo of given id', function(done) {
            const TodoMock = sinon.mock(TodoModel);

            TodoMock.expects('remove').withArgs({ _id: 12345 }).yields(null, 'DELETE');
            TodoModel.remove({ _id: 12345 }, function(err, res) {
                TodoMock.verify();
                TodoMock.restore();
                done();
            });
        });
    });

    describe('Update a Todo', function() {
        it('should update the todo with new value', function(done) {
            const TodoMock = sinon.mock(new TodoModel({ todo: 'Save new todo from mock' })),
                todo = TodoMock.object;

            TodoMock.expects('save').withArgs({ _id: 12345 }).yields(null, 'UPDATE');
            todo.save({ _id: 12345 }, function(err, res) {
                TodoMock.verify();
                TodoMock.restore();
                done();
            });
        });
    });
});