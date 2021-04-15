'use strict';
var Item2 = require('../model/appModelFoundItems.js');

exports.list_all_foundItems = function (req, res) {
    console.log("LIST ALL FOUND Items");
    Item2.getAllItem(function (err, item2) {
        console.log('controller');
        res.setHeader('Content-Type', 'application/json');
        if (err) res.send(err);
        //console.log('res', task);
        res.send(item2);
    });
};
exports.create_a_foundItem = function (req, res) {
    console.log("POST CREATED");
    var new_foundItem = new Item2(req.body);
    console.log( new_foundItem );
    //handles null error
    if (!new_foundItem.item || !new_foundItem.officerName) {
        res.status(400).send({error: true, message: 'Please provide found item'});
    } else {
        Item.createItem(new_foundItem, function (err, item2) {
            if (err) res.send(err);
            res.json(item2);
        });
    }
};
exports.read_a_foundItem = function (req, res) {
    Item2.getItemByID(req.params.itemID, function (err, item2) {
        if (err) res.send(err);
        res.json(item2);
    });
};
exports.update_a_foundItem = function (req, res) {
    Item2.updateByID(req.params.itemID, new Item(req.body), function (err, item2) {
        if (err) res.send(err);
        res.json(item2);
    });
};
exports.delete_a_foundItem = function (req, res) {
    Item2.remove(req.params.itemID, function (err, item2) {
        if (err) res.send(err);
        res.json({message: 'Found Item successfully deleted'});
    });
};