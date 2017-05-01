/**
 * Created by CARDOKAMBLA on 5/1/2017.
 */
$(document).ready(function(){
    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/totalUsers',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            document.getElementById('joinUs').innerHTML ="Join our " + data.totalUsers["COUNT(*)"] + " users today!";
        },
        error: function(data) {
            alert(data.totalUsers["COUNT(*)"]);
        }
    });
});