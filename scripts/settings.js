/**
 * Created by CardoKambla on 20.04.2017.
 */

$(document).ready(function() {
    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/loggedIn',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
            if (data.loggedIn === false) {
                sendToLogin();
            }
        },
        error: function (data) {
            if (data.loggedIn === false) {
                sendToLogin();
            }
            console.log(data);
        }
    });

    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/getMe',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#myUsername").text(data.username);
            $("#myName").text(data.name);
            if(data.profile_pic == null){
                $("#profilePicture").attr("src","../../pictures/question-mark.gif");
            }else{
                $("#profilePicture").attr("src","https://iizibang.jjdev.eu/uploads/profilepics/"+data.profile_pic);
            }
            console.log(data);

        },
        error: function (data) {
            $("#myUsername").text("Could not connect");
            $("#myName").text("To the database");
            $("#profilePicture").attr("src","../../pictures/iiZiBangLogo.png");

            console.log(data);
        }
    })


});


$("#logout").click(function() {
    $.ajax({
        url : "https://iizibang.jjdev.eu/api/logout",
        method : "POST",
        success : function(data) {
            console.log("clicked");
            window.location.replace("https://iizibang.jjdev.eu/");
        },
        error : function(data) {
            console.log(data);
            alert("Error");
        }
    });
});

function changePicture() {
    
}