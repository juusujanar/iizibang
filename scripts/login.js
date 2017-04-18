function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

$('#loginButton').on('click', function (e) {
    e.preventDefault();
    var $form = $("#login-form");
    var data = getFormData($form);
    console.log(data);

    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/login',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: data,
        processData: false,
        contentType: false,
        success: function(data) {
            $('#loginButton').href ="../application/index.html";
            console.log(data);
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