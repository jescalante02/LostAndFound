'use strict';
var Item = require('../model/appModel.js');
exports.list_all_item = function (req, res) {
    Item.getAllItem(function (err, item) {
        console.log('controller')
        if (err) res.send(err);
        console.log('res', item);
        res.send(item);
    });
};
exports.create_a_item = function (req, res) {
    var new_item = new Item(req.body);
    //handles null error
    if (!new_item.item || !new_item.status) {
        res.status(400).send({error: true, message: 'Please provide item'});
    } else {
        Item.createItem(new_item, function (err, item) {
            if (err) res.send(err);
            res.json(item);
        });
    }
};
exports.read_a_item = function (req, res) {
    Item.getItemById(req.params.ItemId, function (err, item) {
        if (err) res.send(err);
        res.json(item);
    });
};
exports.update_a_item = function (req, res) {
    Item.updateById(req.params.ItemId, new Item(req.body), function (err, item) {
        if (err) res.send(err);
        res.json(item);
    });
};
exports.delete_a_item = function (req, res) {
    Item.remove(req.params.ItemId, function (err, task) {
        if (err) res.send(err);
        res.json({message: 'Item successfully deleted'});
    });
};

