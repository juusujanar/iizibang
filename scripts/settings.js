/**
 * Created by CardoKambla on 20.04.2017.
 */


$("#logout").click(function() {
    $.ajax({
        url : "https://iizibang.jjdev.eu/api/logout",
        method : "POST",
        data :token ,
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