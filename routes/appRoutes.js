'use strict';
module.exports = function (app) {
    var todoList = require('../controller/appController');
    // todoList Routes
    app.route('/items')
        .get(todoList.list_all_item)
        .post(todoList.create_a_item);
    app.route('/items/:item_id')
        .get(todoList.read_a_item)
        .put(todoList.update_a_item)
        .delete(todoList.delete_a_item);
};