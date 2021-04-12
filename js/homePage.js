function updateIt( itemID,  officerName, itemType, itemDesc, itemVal, location, dateFound, timeFound ) {
    alert(`Update IT! ${itemID}`);
    let str = `<h2> Update of id:${itemID} </h2>`;
    str += `<input type='text' name='officerName' id='officerName' value='${officerName}'>`;
    str += `<input type='text' name='itemType' id='itemType' value='${itemType}'>`;
    str += `<input type='text' name='itemDesc' id='itemDesc' value='${itemDesc}'>`;
    str += `<input type='text' name='itemVal' id='itemVal' value='${itemVal}'>`;
    str += `<input type='text' name='location' id='location' value='${location}'>`;
    str += `<input type='text' name='dateFound' id='dateFound' value='${dateFound}'>`;
    str += `<input type='text' name='timeFound' id='timeFound' value='${timeFound}'>`;


    str += `<button type="button" class="btn btn-primary" onClick="sendTheUpdate(${itemID})">Update ${itemID} </button> `;
    $("#results").html( str );
}
function sendTheUpdate( itemID ) {
    alert(`SendoTheUpdateIT! ${itemID}`);
    // ToDo: Error Checking
    let officerName = $("#officerName").val();
    let itemType = $("#itemType").val();
    let itemDesc = $("#itemDesc").val();
    let itemVal = $("#itemVal").val();
    let location = $("#location").val();
    let dateFound = $("#dateFound").val();
    let timeFound = $("#timeFound").val();

    let URL = `http://127.0.0.1:3000/items/${itemID}`;
    let d = {
        officerName : `${officerName}`,
        itemType : `${itemType}`,
        itemDesc : `${itemDesc}`,
        itemVal : `${itemVal}`,
        location : `${location}`,
        dateFound : `${dateFound}`,
        timeFound : `${timeFound}`
    };
    $.ajax({
        url : URL,
        contentType : 'application/json',
        type: 'PUT',
        data : JSON.stringify( d ),
        success : function( data ) {
            let oStr = "<h2> Success </h2>" ;
            console.log(`Success`)
            console.log( data );
            //alert("SUCCESS");
            window.location.reload();
        },
        error : function( xhr, status, error ) {
            alert( "Error");
            console.log(`AJAX ERROR`)
            console.log( error );
        }
    })

    // PUT with the ID -> 127.0.0.1:3000/12
}
function deleteIt( itemID ) {
    alert(`DELETE IT! ${itemID}`)
    // This is the spot -> AJAX call to delete id=id
    // delete -> verb -> DELETE
    // tasks/id
    // Todo: Need to error check the ID
    let URL = `http://127.0.0.1:3000/items/${itemID}`;
    alert(`URL:${URL}`);
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
$(document).ready(function() {
    //alert("Document Loaded");
    // JS AJAX CODE HERE TO GET ALL THE TASKS
    let id=document.getElementById("itemArea");
    let URL = "http://127.0.0.1:3000/items"
    $.ajax({
        url: URL,
        headers: {'Access-Control-Allow-Origin':'*'}, // <-------- set this
        contentType: 'application/json',
        async: true,
        crossDomain : true,
        success : function( data ){
            let oStr = `<h2> Lost Items </h2>`;
            oStr += "<table border='1'> ";
            oStr += `<tr>
                        <th>Item ID</th>
                        <th>Officer Name</th>
                        <th>Item Type</th>
                        <th>Item Description</th>
                        <th>Item Value</th>
                        <th>Location</th>
                        <th>Date Found</th>
                        <th>Time Found</th>
                      </tr>`;
           // alert("success");
            console.log(`data:`);
            console.log( data );
            for (let i=0; i<data.length; i++){
                let ti = data[i].id;
                let o = data[i].officerName;
                let iT = data[i].itemType;
                let iD = data[i].itemDesc;
                let iV = data[i].itemVal;
                let l = data[i].location;
                let dF = data[i].dateFound;
                let tF = data[i].timeFound;
                oStr += `<tr><td>${ti}</td><td>${o}</td><td>${iT}</td><td>${iD}</td><td>${iV}</td><td>${l}</td><td>${dF}</td><td>${tF}</td>`;
                oStr += `<td> <button type="button" class="btn btn-primary" onClick="deleteIt(${ti})">Delete ${ti} </button> </td>`;
                oStr += `<td> <button type="button" class="btn btn-primary" onClick="updateIt(${ti},'${o}', '${iT}','${iD}','${iV}','${l}','${dF}','${tF}' )">Update ${ti} </button> </td>`;
                oStr += `</tr>`;

            }
            oStr += `</table>`;
            id.innerHTML = oStr;
        },
        error : function( xhr, status, error ) {
            alert("Error");
        }

    })
    console.log(`URL:${URL}`);
});