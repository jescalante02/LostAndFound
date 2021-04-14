'use strict';
var Item = require('../model/appModel.js');

exports.list_all_items = function (req, res) {
    console.log("LIST ALL Items");
    Item.getAllItem(function (err, item) {
        console.log('controller');
        res.setHeader('Content-Type', 'application/json');
        if (err) res.send(err);
        //console.log('res', task);
        res.send(item);
    });
};
exports.create_a_item = function (req, res) {
    console.log("POST CREATED");
    var new_item = new Item(req.body);
    console.log( new_item );
    //handles null error
    if (!new_item.item || !new_item.officerName) {
        res.status(400).send({error: true, message: 'Please provide item'});
    } else {
        Item.createItem(new_item, function (err, item) {
            if (err) res.send(err);
            res.json(item);
        });
    }
};
exports.read_a_item = function (req, res) {
    Item.getItemByID(req.params.itemID, function (err, item) {
        if (err) res.send(err);
        res.json(item);
    });
};
exports.update_a_item = function (req, res) {
    Item.updateByID(req.params.itemID, new Item(req.body), function (err, item) {
        if (err) res.send(err);
        res.json(item);
    });
};
exports.delete_a_item = function (req, res) {
    Item.remove(req.params.itemID, function (err, item) {
        if (err) res.send(err);
        res.json({message: 'Item successfully deleted'});
    });
};