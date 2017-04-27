/**
 * Created by CARDOKAMBLA on 4/23/2017.
 */
var xhttp = new XMLHttpRequest();
$( document ).ready(function() {

    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/findmatches',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            $("#profileUsername").text(data.username);
            $("#name").text(data.firstname + " "+ data.lastname);
            $("#vanus").text(get_age(data.birthdate));

            console.log(data);
        },
        error: function(data) {
            $("#profileUsername").text("No Matches Found...");
            console.log(data);
        }
    });
    /*xhttp.onreadystatechange = function() {
        // if (this.readyState == 4 && this.status == 200) {
            $("#profileUsername").text = this.responseText;
        //}
    };
    xhttp.open("GET", "https://iizibang.jjdev.eu/application/findmatches", true);
    xhttp.send();*/
});



function sendDislike(){
    console.log("Dislike button clicked");
    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/findmatches',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            $("#profileUsername").text(data.username);
            $("#name").text(data.firstname + " "+ data.lastname);
            $("#vanus").text(get_age(data.birthdate));
            console.log(data);
        },
        error: function(data) {
            $("#profileUsername").text("No Matches Found...");
            console.log(data);
        }
    });
}

function sendLike(){
    console.log("Like button clicked");
    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/findmatches',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            $("#profileUsername").text(data.username);
            $("#name").text(data.firstname + " "+ data.lastname);
            $("#vanus").text(get_age(data.birthdate));
            console.log(data);
        },
        error: function(data) {
            $("#profileUsername").text("No Matches Found...");
            console.log(data);
        }
    });
}

var MILLISECONDS_IN_A_YEAR = 1000*60*60*24*365;
function get_age(time){
    var date_array = time.split('-')
    var years_elapsed = (new Date() - new Date(date_array[0],date_array[1],date_array[2]))/(MILLISECONDS_IN_A_YEAR);
    return years_elapsed; }