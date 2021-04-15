$(document).ready(function (){

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

        constructor(officerFound, dateFound, itemType, itemDesc, timeFound, building, buildingFloor, buildingDesc, itemValue) {
            this.#officerFound = officerFound;
            this.#dateFound = dateFound;
            this.#itemType = itemType;
            this.#itemDesc = itemDesc;
            this.#timeFound = timeFound;
            this.#building = building;
            this.#buildingFloor = buildingFloor;
            this.#buildingDesc = buildingDesc;
            this.#itemValue = itemValue;
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
    }

    $('#submitBtn').click(function (){
        //Initialize lostItem object
        let item = new lostItem('','','','','','','','',0)
        let testBuffer = ''; //This variable will play a part at testing whether the response from the user input is valid
        let numOfErrors = 0; //This variable represents the num of errors, and if any, will not proceed to post the item onto the database
        numOfErrors += getAndTestOfficerFound(testBuffer, item)
        numOfErrors += getAndTestDateFound(testBuffer, item)
        //alert(numOfErrors)
    })

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

})
