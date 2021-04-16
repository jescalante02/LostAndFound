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

    let URL = `http://127.0.0.1:3000/lostAndFound/foundItems/${id}`;
    let d2 = {
        studentFName : `${studentFName}`,
        studentLName : `${studentLName}`,
        AUID : `${AUID}`,
        studentPhoneNum : `${studentPhoneNum}`,
        dateRecovered : `${dateRecovered}`,
        timeRecovered : `${timeRecovered}`
    };
    $.ajax({
        url : URL,
        contentType : 'application/json',
        type: 'PUT',
        data : JSON.stringify( d2 ),
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
$(document).ready(function() {

    //alert("Document Loaded");
    // JS AJAX CODE HERE TO GET ALL THE TASKS
    let id=document.getElementById("taskArea");
    let URL = `http://127.0.0.1:3000/lostAndFound/foundItems`;


    //ToDo: This is how to input a table in HTML dynamically
    //ToDo: Take Note

    $.ajax({
        url: URL,
        headers: {'Access-Control-Allow-Origin':'*'}, // <-------- set this
        contentType: 'application/json',
        async: true,
        crossDomain : true,
        success : function( data ){
            let oStr = `<h2> Found Items </h2>`;
            oStr += "<table border='1'> ";
            oStr += `<tr><th>Id</th><th>Student First Name</th><th>Student Last Name</th><th>AUID</th><th>Student Phone Number</th><th>Date Recovered</th><th>Time Recovered</th><th>Actions</th></tr>`;
            //alert("success");
            console.log(`data:`);
            console.log( data );
            for (let i=0; i<data.length; i++){
                let ti = data[i].itemID;
                let fN = data[i].studentFName;
                let lN = data[i].studentLName;
                let AUID = data[i].AUID;
                let pN = data[i].studentPhoneNum;
                let dR = data[i].dateRecovered;
                let tR = data[i].timeRecovered;
                oStr += `<tr><td>${ti}</td><td>${fN}</td><td>${lN}</td><td>${AUID}</td><td>${pN}</td><td>${dR}</td><td>${tR}</td>`;
                oStr += `<td> <button type="button" class="btn btn-primary" onClick="deleteIt(${ti})">Delete ${ti} </button>  <button type="button" class="btn btn-primary" onClick="updateIt(${ti}, '${fN}', '${lN}', '${AUID}', '${pN}', '${dR}', '${tR}' )">Update ${ti} </button></td>`;
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