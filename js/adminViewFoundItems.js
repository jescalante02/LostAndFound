function deleteIt( id ) {
    alert(`DELETE IT! ${id}`)
    // This is the spot -> AJAX call to delete id=id
    // delete -> verb -> DELETE
    // tasks/id
    // Todo: Need to error check the ID
    let URL = `http://127.0.0.1:3000/lostAndFound/foundItems/${id}`;
    alert(`URL:${URL}`)
    let oStr  = "";
    $.ajax( {
        url : URL,
        contentType: 'application/json',
        type: "DELETE",
        success: function( data ){
            console.log( "SUCCESS");
            console.log( data );
            // Todo: add a cookie with this message
            oStr = `<span style="color:red"> ${data.message}</span>`
            $("#ajaxResults").html( oStr );
            alert("Success");
            window.location.reload();
        },
        error: function( xhr, status, error ) {
            alert("Error");
            console.log( "Error");
            window.location.reload();
        }
    })

}
let dataFoundItems; //Variable that saves the JSON from the foundItems DB

$.ajax({
    url: `http://127.0.0.1:3000/lostAndFound/foundItems`,
    headers: {'Access-Control-Allow-Origin':'*'}, // <-------- set this
    contentType: 'application/json',
    async: true,
    crossDomain : true,
    success : function( data ){
        let oStr = `<h2> Found Items </h2>`;
        oStr += "<table border='1'> ";
        oStr += `<tr><th>Found ID</th><th>Officer Name</th><th>Item Type</th><th>Item Info</th><th>Item Value</th><th>Location</th><th>Date Found</th><th>Time Found</th><th>Student First Name</th><th>Student Last Name</th><th>AUID</th><th>Student Phone Number</th><th>Date Recovered</th><th>Time Recovered</th><th>Actions</th></tr>`;
        //alert("success");
        console.log(`data:`);
        console.log( data );
        dataFoundItems = data;
        for (let i=0; i<data.length; i++){
            let ti = data[i].itemID;
            let of = data[i].officerName;
            let it = data[i].itemType;
            let iDesc = data[i].itemDesc;
            let iv = data[i].itemVal;
            let l = data[i].location;
            let df = data[i].dateFound;
            let tf = data[i].timeFound;

            let fN = data[i].studentFName;
            let lN = data[i].studentLName;
            let AUID = data[i].AUID;
            let pN = data[i].studentPhoneNum;
            let dR = data[i].dateRecovered;
            let tR = data[i].timeRecovered;
            oStr += `<tr><td>${ti}</td><td>${of}</td><td>${it}</td><td>${iDesc}</td><td>${"$"+ iv}</td><td>${l}</td><td>${df}</td><td>${tf}</td><td>${fN}</td><td>${lN}</td><td>${AUID}</td><td>${pN}</td><td>${dR}</td><td>${tR}</td>`;
            oStr += `<td> <button type="button" class="btn btn-primary" onClick="deleteIt(${ti})">Delete ${ti} </button>  </td>`;
            oStr += `</tr>`;

        }
        oStr += `</table>`;
        let id=document.getElementById("taskArea");
        id.innerHTML = oStr;
    },
    error : function( xhr, status, error ) {
        alert(URL)
        alert("Error");
    }

})
