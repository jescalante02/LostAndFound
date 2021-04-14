'use strict';
module.exports = function (app) {
    var todoList = require('../controller/appController');
    // todoList Routes
    app.route('/lostAndFound/lostItems')
        .get(todoList.list_all_items)
        .post(todoList.create_a_item);

    app.route('/lostAndFound/lostItems/:itemID')
        .get(todoList.read_a_item)
        .put(todoList.update_a_item)
        .delete(todoList.delete_a_item);

    var todoList2 = require('../controller/foundItemsController');

    app.route('/lostAndFound/foundItems')
        .get(todoList2.list_all_foundItems)
        .post(todoList2.create_a_foundItem);

    app.route('/lostAndFound/foundItems/:itemID')
        .get(todoList2.read_a_foundItem)
        .put(todoList2.update_a_foundItem)
        .delete(todoList2.delete_a_foundItem);

};