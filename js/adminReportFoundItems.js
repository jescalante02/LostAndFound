
    let lostURL = "http://127.0.0.1:3000/lostAndFound/lostItems"
    let foundURL = "http://127.0.0.1:3000/lostAndFound/foundItems"

    class foundItem {
        //Attributes for the lostItems DB
        #officerFound
        #dateFound
        #itemType
        #itemDesc
        #timeFound
        #building
        #buildingFloor
        #buildingDesc
        #itemValue
        #location

        //Attributes for the lostItems & foundItems DB
        #itemID
        #dateRecovered
        #AUID
        #timeRecovered
        #studentFName
        #studentLName
        #studentPhoneNum
        #studentDriversLicense

        #goThroughBool


        constructor(officerFound, dateFound, itemType, itemDesc, timeFound, building, buildingFloor, buildingDesc, itemValue, location, itemID, dateRecovered, AUID, timeRecovered, studentFName, studentLName, studentPhoneNum, studentDriversLicense, goThroughBool) {
            this.#officerFound = officerFound;
            this.#dateFound = dateFound;
            this.#itemType = itemType;
            this.#itemDesc = itemDesc;
            this.#timeFound = timeFound;
            this.#building = building;
            this.#buildingFloor = buildingFloor;
            this.#buildingDesc = buildingDesc;
            this.#itemValue = itemValue;
            this.#location = location;
            this.#itemID = itemID;
            this.#dateRecovered = dateRecovered;
            this.#AUID = AUID;
            this.#timeRecovered = timeRecovered;
            this.#studentFName = studentFName;
            this.#studentLName = studentLName;
            this.#studentPhoneNum = studentPhoneNum;
            this.#studentDriversLicense = studentDriversLicense;
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


        get itemID() {
            return this.#itemID;
        }

        set itemID(value) {
            this.#itemID = value;
        }

        get dateRecovered() {
            return this.#dateRecovered;
        }

        set dateRecovered(value) {
            this.#dateRecovered = value;
        }

        get AUID() {
            return this.#AUID;
        }

        set AUID(value) {
            this.#AUID = value;
        }

        get timeRecovered() {
            return this.#timeRecovered;
        }

        set timeRecovered(value) {
            this.#timeRecovered = value;
        }

        get studentFName() {
            return this.#studentFName;
        }

        set studentFName(value) {
            this.#studentFName = value;
        }

        get studentLName() {
            return this.#studentLName;
        }

        set studentLName(value) {
            this.#studentLName = value;
        }

        get studentPhoneNum() {
            return this.#studentPhoneNum;
        }

        set studentPhoneNum(value) {
            this.#studentPhoneNum = value;
        }

        get studentDriversLicense() {
            return this.#studentDriversLicense;
        }

        set studentDriversLicense(value) {
            this.#studentDriversLicense = value;
        }

        get location() {
            return this.#location;
        }

        set location(value) {
            this.#location = value;
        }

        get goThroughBool() {
            return this.#goThroughBool;
        }

        set goThroughBool(value) {
            this.#goThroughBool = value;
        }
    }

    let dataLostItems; //Variable that saves the JSON from the lostItems DB

    //Connects to the lostItems database
    $.ajax({
        url: lostURL,
        headers: {'Access-Control-Allow-Origin': '*'}, // <-------- set this
        contentType: 'application/json',
        async: true,
        crossDomain: true,
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                dataLostItems = data;
            }
        },
        error: function (xhr, status, error) {
            alert("Error");
        }

    })

    //Activates when user presses the submit button
    function submitBtn() {
        //Initialize lostItem object
        let item = new foundItem('', '', '', '', '', '', '', '', 0,
            '', 0, 0, 0, '', '', '', '', '', false)
        let testBuffer = ''; //This variable will play a part at testing whether the response from the user input is valid
        let numOfErrors = 0; //This variable represents the num of errors, and if any, will not proceed to post the item onto the database
        numOfErrors += getAndTestItemID(testBuffer, item)
        numOfErrors += getAndTestDateRecovered(testBuffer, item)
        numOfErrors += getAndTestAUID(testBuffer, item)
        numOfErrors += getAndTestTimeRecovered(testBuffer, item)
        numOfErrors += getAndTestStudentFName(testBuffer, item)
        numOfErrors += getAndTestStudentLName(testBuffer, item)
        numOfErrors += getAndTestStudentPhoneNum(testBuffer, item)
        numOfErrors += getAndTestStudentDriversLicense(testBuffer, item)

        if (numOfErrors == 0) {
            //Checks to see if the itemID that was input by user exists in the DB, if so, it will proceed to posting it into the DB and record the index of the lostItem
            let lostItemIndex = checkLostItem(item);
            if (item.isFound == true) {
                copyLostItem(item, lostItemIndex);
                insertFoundItem(item)
                alert("Item has been reported.")
                deleteIt(item)
                window.location.reload();
            }
        }


    }

    function getAndTestItemID(buffer, item) {
        buffer = document.getElementById("itemID").value;
        if (buffer === '') {
            alert("Please enter the ID of the item.")
            return 1;
        }
        item.itemID = parseInt(buffer);
        return 0;
    }

    function getAndTestDateRecovered(buffer, item) {
        buffer = document.getElementById("dateRecovered").value;
        if (buffer === '') {
            alert("Please enter the date recovered of the item.")
            return 1;
        }
        item.dateRecovered = buffer;
        return 0;
    }

    function getAndTestAUID(buffer, item) {
        buffer = document.getElementById("AUID").value;
        if (buffer === '') {
            alert("Please enter the AUID of the student who's claiming the item.")
            return 1;
        }
        item.AUID = parseInt(buffer);
        return 0;
    }

    function getAndTestTimeRecovered(buffer, item) {
        buffer = document.getElementById("timeRecovered").value;
        if (buffer === '') {
            alert("Please enter the time recovered of the item that was found.")
            return 1;
        }
        item.timeRecovered = buffer;
        return 0;
    }

    function getAndTestStudentFName(buffer, item) {
        buffer = document.getElementById("studentFName").value;
        if (buffer === '') {
            alert("Please enter the student's first name.")
            return 1;
        }
        item.studentFName = buffer;
        return 0;
    }

    function getAndTestStudentLName(buffer, item) {
        buffer = document.getElementById("studentLName").value;
        if (buffer === '') {
            alert("Please enter the student's last name.")
            return 1;
        }
        item.studentLName = buffer;
        return 0;
    }

    function getAndTestStudentPhoneNum(buffer, item) {
        buffer = document.getElementById("studentPhoneNum").value;
        if (buffer === '') {
            alert("Please enter the phone number of the student who's claiming the item.")
            return 1;
        }
        item.studentPhoneNum = parseInt(buffer);
        return 0;
    }

    function getAndTestStudentDriversLicense(buffer, item) {
        buffer = document.getElementById("studentDriversLicense").value;
        //This is not a required field to input data
        item.studentDriversLicense = buffer;
        return 0;
    }

    function checkLostItem(item) {
        //alert("Testing.."+dataLostItems.length)
        for (let i = 0; i < dataLostItems.length; i++) {
            //console.log(dataLostItems[i])
            if (dataLostItems[i].itemID == item.itemID) {
                alert("Success")
                item.isFound = true
                return i
            }
        }
        alert("That item ID was not found, please try again.")
        item.isFound = false
        return 1

    }

    function copyLostItem(item, j) {
        item.officerFound = dataLostItems[j].officerName;
        item.itemType = dataLostItems[j].itemType;
        item.itemDesc = dataLostItems[j].itemDesc;
        item.itemValue = dataLostItems[j].itemVal;
        item.location = dataLostItems[j].location;
        item.timeFound = dataLostItems[j].timeFound
        item.dateFound = dataLostItems[j].dateFound;
    }

    function insertFoundItem(item) {
        let d = {
            officerName: `${item.officerFound}`,
            itemType: `${item.itemType}`,
            itemDesc: `${item.itemDesc}`,
            itemVal: `${item.itemValue}`,
            location: `${item.location}`,
            dateFound: `${item.dateFound}`,
            timeFound: `${item.timeFound}`,
            studentFName: `${item.studentFName}`,
            studentLName: `${item.studentLName}`,
            AUID: `${item.AUID}`,
            studentPhoneNum: `${item.studentPhoneNum}`,
            dateRecovered: `${item.dateRecovered}`,
            timeRecovered: `${item.timeRecovered}`,
            studentDriversLicense: `${item.studentDriversLicense}`
        };
        $.ajax({
            url: foundURL,
            contentType: 'application/json',
            type: 'POST',
            data: JSON.stringify(d),
            success: function (data) {
                //let oStr = "<h2> Success </h2>" ;
                console.log(`Success`)
                console.log(data);
                alert("Item has been reported.")
                item.goThroughBool = true
                //window.location.reload();
            },
            error: function (xhr, status, error) {
                alert("Error");
                item.goThroughBool = false
                console.log(`AJAX ERROR`)
                console.log(error);
            }
        })
    }

    function deleteIt(item) {
        // Todo: Need to error check the ID
        let URL = `http://127.0.0.1:3000/lostAndFound/lostItems/${item.itemID}`;
        $.ajax({
            url: URL,
            contentType: 'application/json',
            type: "DELETE",
            success: function (data) {
                console.log("SUCCESS");
                console.log(data);
                window.location.reload();
            },
            error: function (xhr, status, error) {
                alert("Error");
                console.log("Error");
                window.location.reload();
            }
        })


    }


