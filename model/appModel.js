'use strict';
var sql = require('./db.js');
//Task object constructor
var Item = function (item) {
    this.officerName = item.officerName;
    this.itemType = item.itemType;
    this.itemDesc = item.itemDesc;
    this.itemVal = item.itemVal;
    this.location = item.location;
    this.dateFound = item.dateFound;
    this.timeFound = item.timeFound;
};
Item.createItem = function (newItem, result) {
    sql.query("INSERT INTO LostItems set ?", newItem, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Item.getItemByID = function (itemID, result) {
    sql.query("Select itemID, officerName, itemType, itemDesc, itemVal, location, dateFound, timeFound from LostItems where itemID = ? ", itemID, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Item.getAllItem = function (result) {
    sql.query("Select * from LostItems", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('Lost Items : ', res);
            result(null, res);
        }
    });
};
Item.updateByID = function (itemID, LostItem, result) {
    sql.query("UPDATE LostItems SET LostItems = ? WHERE itemID = ?", [LostItem.item, itemID], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Item.remove = function (itemID, result) {
    sql.query("DELETE FROM LostItems WHERE itemID = ?", [itemID], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
module.exports = Item;
