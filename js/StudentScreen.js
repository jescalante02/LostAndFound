function updateIt( id, task, status ) {
    alert(`Update IT! ${id}`);
    let str = `<h2> Update of id:${id} </h2>`;
    str += `<input type='text' name='task' id='task' value='${task}'>`;
    str += `<input type='text' name='status' id='status' value='${status}'>`;
    str += `<button type="button" class="btn btn-primary" onClick="sendTheUpdate(${id})">Update ${id} </button> `;
    $("#results").html( str );
}
function sendTheUpdate( id ) {
    alert(`SendoTheUpdateIT! ${id}`)
    // ToDo: Error Checking
    let task = $("#task").val();
    let status = $("#status").val();

    let URL = `http://127.0.0.1:3000/lostAndFound/lostItems/${id}`;
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
            alert("SUCCESS");
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
function deleteIt( id ) {
    alert(`DELETE IT! ${id}`)
    // This is the spot -> AJAX call to delete id=id
    // delete -> verb -> DELETE
    // tasks/id
    // Todo: Need to error check the ID
    let URL = `http://127.0.0.1:3000/lostAndFound/lostItems/${id}`;
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
// ToDo: Review to take this out
function startIt(){
    alert("CLICK READY TO GO");
}
$(document).ready(function() {

    //alert("Document Loaded");
    // JS AJAX CODE HERE TO GET ALL THE TASKS
    let id=document.getElementById("taskArea");
    let URL = `http://127.0.0.1:3000/lostAndFound/lostItems`;


    //ToDo: This is how to input a table in HTML dynamically
    //ToDo: Take Note

    $.ajax({
        url: URL,
        headers: {'Access-Control-Allow-Origin':'*'}, // <-------- set this
        contentType: 'application/json',
        async: true,
        crossDomain : true,
        success : function( data ){
            let oStr = "<h2>Student View - View Lost Items</h2>";
            oStr += "<table border='1'> ";
            oStr += `<tr><th>Item Category</th><th>Item Description</th><th>Location</th><th>Date Found</th><th>Time Found</th></tr>`;
            //alert("success");
            console.log(`data:`);
            console.log( data );
            for (let i=0; i<data.length; i++){
                let it = data[i].itemType;
                let iDesc = data[i].itemDesc;
                let l = data[i].location;
                let df = data[i].dateFound;
                let tf = data[i].timeFound;
                oStr += `<tr><td>${it}</td><td>${iDesc}</td><td>${l}</td><td>${df}</td><td>${tf}</td></td>`;
                oStr += `</tr>`;

            }
            oStr += `</table>`;
            id.innerHTML = oStr;
        },
        error : function( xhr, status, error ) {
            alert(URL)
            alert("Error");
        }

    })
    console.log(`URL:${URL}`);
});