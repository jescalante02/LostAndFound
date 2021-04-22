describe('Found Tests', function() {
    context( "Report Found Item Tests", function() {
        it( "Show that a foundItem object can be created", function(){
            let item = new foundItem('Roberto', '2021-04-21', 'Accessories', 'A watch', '10:35:00', 'Dunham School', '1', 'In a classroom', 50, "Dunham School, 1, In a classroom", 13, "2021-04-22", "123456", "10:35:00", "Mark", "Sanchez", "6306785432", "A123456789")
            //chai.assert.strictEqual((item.officerFound == "Roberto") && (item.dateFound == "2021-04-21") && (item.itemType == "Accessories") && (item.itemDesc == 'A watch') && (item.timeFound == '10:35:00') && (item.building == 'Dunham School') && (item.buildingFloor == '1') && (item.buildingDesc == 'In a classroom') && (item.itemValue == 50) && (item.location == "Dunham School, 1, In a classroom") && (item.itemID == 13) && (item.dateRecovered == "2021-04-22") && (item.AUID == "123456") && (item.timeRecovered == "10:35:00") && (item.studentFName == "Mark") && (item.studentLName == "Sanchez") && (item.studentPhoneNum == "6306785432") && (item.studentDriversLicense == "A123456789"), true)
            chai.assert.isObject(item)
        })
        it( "Show that you can get lostItems from the DB", function(){
            let item2 = new foundItem('Roberto', '2021-04-21', 'Accessories', 'A watch', '10:35:00', 'Dunham School', '1', 'In a classroom', 50, "Dunham School, 1, In a classroom", 13, "2021-04-22", "123456", "10:35:00", "Mark", "Sanchez", "6306785432", "A123456789")
            insertFoundItem(item2);
            $(document).ready(function() {
                chai.assert.isTrue(item2.goThroughBool)
            })
        })
        it( "Show that a foundItems can be created to the DB", function(){
            $(document).ready(function() {
                chai.assert.isObject(dataLostItems)
            })
        })
    })
    context( "View Found Item Tests", function() {
        //The following tests the adminViewFoundItems page
        it("Show that a foundItem can be view from the DB", function () {
            $(document).ready(function() {
                chai.assert.isObject(dataFoundItems);
            })
        })
    })
})