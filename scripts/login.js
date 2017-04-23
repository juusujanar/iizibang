// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
});

function getFormData(form){
    var unindexed_array = form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

$('#login-form').submit(function (e) {
    e.preventDefault();
    console.log("loggedstuff");
    var form = $("#login-form");
    var formData = getFormData(form);

    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/login',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(formData),
        success: function(data) {
            console.log(data);
            if(data["code"] === 200){
                window.location.replace("https://iizibang.jjdev.eu/application/picker");
            }


        },
        error: function(data) {
            alert('Error');
            console.log(data);
        }
    });


});

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
};

