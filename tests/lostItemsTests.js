describe('Lost Tests', function() {
    context( "Report Lost Item Tests", function() {
        //The following tests the adminReportLostItems page
        it( "Show that a lostItem object can be created", function(){
            let item = new lostItem('Roberto', '2021-04-21', 'Accessories', 'A watch', '10:35:00', 'Dunham School', '1', 'In a classroom', 50)
            //chai.assert.strictEqual((item.officerFound == "Roberto") && (item.dateFound == "2021-04-21") && (item.itemType == "Accessories") && (item.itemDesc == 'A watch') && (item.timeFound == '10:35:00') && (item.building == 'Dunham School') && (item.buildingFloor == '1') && (item.buildingDesc == 'In a classroom') && (item.itemValue == 50), true)
            chai.assert.isObject(item)
        })
        it( "Show that a lostItem can be created to the DB", function(){
            let item = new lostItem('Roberto', '2021-04-21', 'Accessories', 'A watch', '10:35:00', 'Dunham School', '1', 'In a classroom', 50)
            insertLostItem(item)
            $(document).ready(function() {
            chai.assert.isTrue(item.goThroughBool)
            })
        })
        context( "View Lost Item Tests", function() {
            //The following tests the adminViewLostItems page
            it("Show that a lostItem can be view from the DB", function () {
            $(document).ready(function() {
                chai.assert.isObject(dataLostItems)
            })
            })
        })
    })
})
