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

    let URL = `http://127.0.0.1:3000/students/${id}`;
    let d = {
        task : `${task}`,
        status : `${status}`
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
    let URL = `http://127.0.0.1:3000/students/${id}`;
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
    let URL = "http://127.0.0.1:3000/students"

    //ToDo: This is how to input a table in HTML dynamically
    //ToDo: Take Notes

    $.ajax({
        url: URL,
        headers: {'Access-Control-Allow-Origin':'*'}, // <-------- set this
        contentType: 'application/json',
        async: true,
        crossDomain : true,
        success : function( data ){
            let oStr = `<h2> Available Tasks </h2>`;
            oStr += "<table border='1'> ";
            oStr += `<tr><th>Id</th><th>Task</th><th>Status</th><th>Created</th></tr>`;
            //alert("success");
            console.log(`data:`);
            console.log( data );
            for (let i=0; i<data.length; i++){
                let ti = data[i].id;
                let t = data[i].task;
                let s = data[i].status;
                let c = data[i].created_at;
                oStr += `<tr><td>${ti}</td><td>${t}</td><td>${s}</td><td>${c}</td>`;
                oStr += `<td> <button type="button" class="btn btn-primary" onClick="deleteIt(${ti})">Delete ${ti} </button> </td>`;
                oStr += `<td> <button type="button" class="btn btn-primary" onClick="updateIt(${ti}, '${t}', '${s}' )">Update ${ti} </button> </td>`;
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