/**
 * Created by CARDOKAMBLA on 5/1/2017.
 */
$(document).ready(function(){
    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/totalUsers',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            $("#joinUs").innerHTML = "Join our " + data.totalUsers + " today!";
            console.log(data);
        },
        error: function(data) {
            alert(data.totalUsers);
            console.log(data);
        }
    });
});