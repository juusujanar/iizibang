webshim.setOptions('waitReady', false);
webshim.setOptions('forms-ext', {types: 'date'});
webshim.polyfill('forms forms-ext');


// Check if password and email values are equal.

$('#password, #passwordConfirm').on('change keyup', function () {
    var pw = $('#password').val();
    if (pw === $('#passwordConfirm').val() && pw !== "") {
        $('#passwordMessage').html('&#10004;').css('color', 'green');
    } else {
        $('#passwordMessage').html('&#10008;').css('color', 'red');
    }
});

$('#email, #emailConfirm').on('change keyup', function () {
    var email = $('#email').val();
    if (email === $('#emailConfirm').val() && email !== "") {
        $('#emailMessage').html('&#10004;').css('color', 'green');
    } else {
        $('#emailMessage').html('&#10008;').css('color', 'red');
    }
});

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}


$('#registerButton').on('click', function (e){
    e.preventDefault();

    if (!$('#email').val() === $('#emailConfirm').val()) {
        alert('Email addresses do not match!');
        return;
    }

    if (!$('#password').val() == $('#passwordConfirm').val()) {
        alert('Passwords do not match!');
        return;
    }

    /*var formData = new FormData();

    formData.append('username', document.getElementById('username').value);
    formData.append('password', document.getElementById('password').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('firstname', document.getElementById('firstname').value);
    formData.append('lastname', document.getElementById('lastname').value);
    formData.append('birthdate', document.getElementById('birthdate').value);
    formData.append('gender', $('input[name="gender"]:checked').val());
    formData.append('interest', $('input[name="interest"]:checked').val());

    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }*/

    var $form = $("#reg-form");
    var data = getFormData($form);
    console.log(data);

    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/register',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: data,
        processData: false,
        contentType: false,
        success: function(data) {
            alert('Success');
            console.log(data);
        },
        error: function(data) {
            alert('Error');
            console.log(data);
        },
    });
});
