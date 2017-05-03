
/**
 * Created by CARDOKAMBLA on 4/23/2017.
 */

$( document ).ready(function() {
    console.log(document.cookie);
    $("#profilePicture").attr("src","../../pictures/loading.gif");
    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/findmatches',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            $("#profileUsername").text(data.username);
            $("#name").text(data.firstname + " "+ data.lastname);
            $("#vanus").text(get_age(data.birthdate));
            if(data.profile_pic == null){
                $("#profilePicture").attr("src","../../pictures/question-mark.gif");
            }else{
                $("#profilePicture").attr("src",data.profile_pic);
            }
            console.log(data);
        },
        error: function(data) {
            $("#profileUsername").text("No Matches Found...");
            $("#name").text("Don't worry, ");
            $("#vanus").text("you will find someone...");
            $("#profilePicture").attr("src","../../pictures/iiziBangLogo.png");
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
    $("#profilePicture").attr("src","../../pictures/loading.gif");
    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/findmatches',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            $("#profileUsername").text(data.username);
            $("#name").text(data.firstname + " "+ data.lastname);
            $("#vanus").text(get_age(data.birthdate));
            if(data.profile_pic == null){
                $("#profilePicture").attr("src","../../pictures/question-mark.gif");
            }else{
                $("#profilePicture").attr("src",data.profile_pic);
            }
            console.log(data);
        },
        error: function(data) {
            $("#profileUsername").text("No Matches Found...");
            $("#name").text("Don't worry, ");
            $("#vanus").text("you will find someone...");
            $("#profilePicture").attr("src","../../pictures/iiziBangLogo.png");
            console.log(data);
        }
    });
}

function sendLike(){
    console.log("Like button clicked");
    $("#profilePicture").attr("src","../../pictures/loading.gif");
    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/findmatches',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            $("#profileUsername").text(data.username);
            $("#name").text(data.firstname + " "+ data.lastname);
            $("#vanus").text(get_age(data.birthdate));
            if(data.profile_pic == null){
                $("#profilePicture").attr("src","../../pictures/question-mark.gif");
            }else{
                $("#profilePicture").attr("src",data.profile_pic);
            }


            console.log(data.profi);
        },
        error: function(data) {
            $("#profileUsername").text("No Matches Found...");
            $("#name").text("Don't worry, ");
            $("#vanus").text("you will find someone...");
            $("#profilePicture").attr("src","../../pictures/iiziBangLogo.png");
            console.log(data.profile_pic);
            console.log(data.profile_pic == null);
            console.log(data.profile_pic === null);
            console.log(data.profile_pic == undefined);
            console.log(data.profile_pic === undefined);

        }
    });
}

var MILLISECONDS_IN_A_YEAR = 1000*60*60*24*365;
function get_age(time){
    var date_array = time.split('-');
    var years_elapsed = (new Date() - new Date(date_array[0],date_array[1],date_array[2]))/(MILLISECONDS_IN_A_YEAR);
    return Math.floor(years_elapsed); }