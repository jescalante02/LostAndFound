'use strict'

    class lostItem {
        #officerFound
        #dateFound
        #itemType
        #itemDesc
        #timeFound
        #building
        #buildingFloor
        #buildingDesc
        #itemValue
        #goThroughBool


        constructor(officerFound, dateFound, itemType, itemDesc, timeFound, building, buildingFloor, buildingDesc, itemValue, goThroughBool) {
            this.#officerFound = officerFound;
            this.#dateFound = dateFound;
            this.#itemType = itemType;
            this.#itemDesc = itemDesc;
            this.#timeFound = timeFound;
            this.#building = building;
            this.#buildingFloor = buildingFloor;
            this.#buildingDesc = buildingDesc;
            this.#itemValue = itemValue;
            this.#goThroughBool = goThroughBool;
        }

        get officerFound() {
            return this.#officerFound;
        }

        set officerFound(value) {
            this.#officerFound = value;
        }

        get dateFound() {
            return this.#dateFound;
        }

        set dateFound(value) {
            this.#dateFound = value;
        }

        get itemType() {
            return this.#itemType;
        }

        set itemType(value) {
            this.#itemType = value;
        }

        get itemDesc() {
            return this.#itemDesc;
        }

        set itemDesc(value) {
            this.#itemDesc = value;
        }

        get timeFound() {
            return this.#timeFound;
        }

        set timeFound(value) {
            this.#timeFound = value;
        }

        get building() {
            return this.#building;
        }

        set building(value) {
            this.#building = value;
        }

        get buildingFloor() {
            return this.#buildingFloor;
        }

        set buildingFloor(value) {
            this.#buildingFloor = value;
        }

        get buildingDesc() {
            return this.#buildingDesc;
        }

        set buildingDesc(value) {
            this.#buildingDesc = value;
        }

        get itemValue() {
            return this.#itemValue;
        }

        set itemValue(value) {
            this.#itemValue = value;
        }

        get goThroughBool() {
            return this.#goThroughBool;
        }

        set goThroughBool(value) {
            this.#goThroughBool = value;
        }
    }

    function submitBtn() {
        //Initialize lostItem object
        let item = new lostItem('','','','','','','','',0, false)
        let testBuffer = ''; //This variable will play a part at testing whether the response from the user input is valid
        let numOfErrors = 0; //This variable represents the num of errors, and if any, will not proceed to post the item onto the database
        numOfErrors += getAndTestOfficerFound(testBuffer, item)
        numOfErrors += getAndTestDateFound(testBuffer, item)
        numOfErrors += getAndTestItemType(testBuffer, item);
        numOfErrors += getAndTestItemDesc(testBuffer, item);
        numOfErrors += getAndTestTimeFound(testBuffer, item)
        numOfErrors += getAndTestBuilding(testBuffer, item);
        numOfErrors += getAndTestBuildingFloor(testBuffer, item);
        numOfErrors += getAndTestBuildingDesc(testBuffer, item);
        numOfErrors += getAndTestItemValue(testBuffer, item)

        if (numOfErrors == 0){
            insertLostItem(item)

        }
    }

    function getAndTestOfficerFound(buffer, item){
        buffer = document.getElementById("officerFound").value;
        if(buffer === ''){
            alert("Please enter the name of the officer who found the item.")
            return 1;
        }
        item.officerFound = buffer;
        return 0;
    }

    function getAndTestDateFound(buffer, item){
        buffer = document.getElementById("dateFound").value;
        if(buffer === ''){
            alert("Please enter the date that the item was found.")
            return 1;
        }
        item.dateFound = buffer;
        return 0;
    }

    function getAndTestItemType(buffer, item){
        buffer = document.querySelector('input[name="itemType"]:checked').value;
        item.itemType = buffer; //Since a radio button is already checked, there's no need to check for garbage
        return 0;
    }

    function getAndTestItemDesc(buffer, item){
        buffer = document.getElementById("itemDesc").value;
        if(buffer === ''){
            alert("Please enter the description of the item that was found.")
            return 1;
        }
        item.itemDesc = buffer;
        return 0;
    }

    function getAndTestTimeFound(buffer, item){
        buffer = document.getElementById("timeFound").value;
        if(buffer === ''){
            alert("Please enter the time found of the item that was found.")
            return 1;
        }
        item.timeFound = buffer;
        return 0;
    }

    function getAndTestBuilding(buffer, item){
        buffer = document.querySelector('input[name="Building"]:checked').value;
        item.building = buffer; //Since a radio button is already checked, there's no need to check for garbage
        return 0;
    }

    function getAndTestBuildingFloor(buffer, item){
        buffer = document.getElementById("floor").value
        if(buffer === ''){
            alert("Please enter the building floor that the item was found.")
            return 1;
        }
        item.buildingFloor = buffer;
        return 0
    }

    function getAndTestBuildingDesc(buffer, item){
        buffer = document.getElementById("buildingDesc").value
        if(buffer === ''){
            alert("Please enter the building description.")
            return 1;
        }
        item.buildingDesc = buffer;
        return 0;
    }

    function getAndTestItemValue(buffer, item){
        buffer = document.getElementById("itemValue").value;
        if(buffer === ''){
            alert("Please enter the item value.")
            return 1;
        }
        item.itemValue = buffer;
        return 0;
    }

    function insertLostItem(item) {
        let totalLocation = item.building + ', ' + "Floor: " +item.buildingFloor + ', ' + item.buildingDesc;
        let URL = "http://127.0.0.1:3000/lostAndFound/lostItems"
        let d = {
            officerName : `${item.officerFound}`,
            itemType : `${item.itemType}`,
            itemDesc : `${item.itemDesc}`,
            itemVal : `${item.itemValue}`,
            location : `${totalLocation}`,
            dateFound : `${item.dateFound}`,
            timeFound : `${item.timeFound}`
        };
        $.ajax({
            url : URL,
            contentType : 'application/json',
            type: 'POST',
            data : JSON.stringify( d ),
            success : function( data ) {
                //let oStr = "<h2> Success </h2>" ;
                console.log(`Success`)
                console.log( data );
                alert("Item has been reported.")
                item.goThroughBool = true;
                //window.location.reload();
            },
            error : function( xhr, status, error ) {
                alert( "Error");
                console.log(`AJAX ERROR`)
                console.log( error );
                item.goThroughBool = false;
            }
        })

    }
