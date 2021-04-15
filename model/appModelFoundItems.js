'use strict';
var sql = require('./db.js');
//Task object constructor
var Item2 = function (item2) {
    this.studentFName = item2.studentFName;
    this.studentLName = item2.studentLName;
    this.AUID = item2.AUID;
    this.studentPhoneNum = item2.studentPhoneNum;
    this.dateRecovered = item2.dateRecovered;
    this.timeRecovered = item2.timeRecovered;
};
Item2.createItem = function (newItem2, result) {
    sql.query("INSERT INTO FoundItem set ?", newItem2, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Item2.getItemByID = function (itemID, result) {
    sql.query("Select studentFName, studentLName, AUID, studentPhoneNum, dateRecovered, timeRecovered from FoundItems where itemID = ? ", itemID, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Item2.getAllItem = function (result) {
    sql.query("Select * from FoundItems", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('Found Items : ', res);
            result(null, res);
        }
    });
};
Item2.updateByID = function (itemID, FoundItem, result) {
    sql.query("UPDATE FoundItems SET FoundItem = ? WHERE itemID = ?", [FoundItem.item, itemID], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Item2.remove = function (itemID, result) {
    sql.query("DELETE FROM FoundItems WHERE itemID = ?", [itemID], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
module.exports = Item2;