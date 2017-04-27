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
            $("#profileUsername").text = data.username;
            console.log(data);
        },
        error: function(data) {
            alert('Error');
            $("#profileUsername").text = data;
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
    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/findmatches',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            $("#profileUsername").text = data.username;
            console.log(data);
        },
        error: function(data) {
            alert('Error');
            $("#profileUsername").text = data;
            console.log(data);
        }
    });
}

function sendLike(){
    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/findmatches',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            $("#profileUsername").text = data.username;
            console.log(data);
        },
        error: function(data) {
            alert('Error');
            $("#profileUsername").text = data;
            console.log(data);
        }
    });
}