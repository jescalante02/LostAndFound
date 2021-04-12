$(document).ready(function() {
    //alert("READY");
});
function insertNew() {
    //alert("CLICK NEW ");
    // the code that will  call ajax to insert stuff
    // get the task from the input box
    let officerName = $("#officerName").val();
    let itemType = $("#itemType").val();
    let itemDesc = $("#itemDesc").val();
    let itemVal = $("#itemVal").val();
    let location = $("#location").val();
    let dateFound = $("#dateFound").val();
    let timeFound = $("#timeFound").val();

    //ToDo: add error checking
    // Use AJAX to call back-end
    // POST to 127.0.0.1:3000 -> BoDY task and status in ajax
    let URL = "http://127.0.0.1:3000/items";
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
        type: 'POST',
        data : JSON.stringify( d ),
        success : function( data ) {
            let oStr = "<h2> Success </h2>" ;
            console.log(`Success`)
            console.log( data );
        },
        error : function( xhr, status, error ) {
            alert( "Error");
            console.log(`AJAX ERROR`)
            console.log( error );
        }
    })
}