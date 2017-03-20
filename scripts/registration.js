// Check if password and email values are equal.

$('#password, #passwordConfirm').on('keyup', function () {
    if ($('#password').val() == $('#passwordConfirm').val()) {
        $('#passwordMessage').html('&#10004;').css('color', 'green');
    } else {
        $('#passwordMessage').html('&#10008;').css('color', 'red');
    }
});

$('#email, #emailConfirm').on('keyup', function () {
    if ($('#email').val() == $('#emailConfirm').val()) {
        $('#emailMessage').html('&#10004;').css('color', 'green');
    } else {
        $('#emailMessage').html('&#10008;').css('color', 'red');
    }
});


$('.ghost-buttonSignUp').on('click', function (){

    if (!$('#email').val() === $('#emailConfirm').val()) {
        alert('Email addresses do not match!');
        return;
    }

    if (!$('#password').val() == $('#passwordConfirm').val()) {
        alert('Passwords do not match!');
        return;
    }

    var formData = new FormData();
    formData.append('username', document.getElementById('username'));
    formData.append('password', document.getElementById('password'));
    formData.append('email', document.getElementById('email'));
    formData.append('firstname', document.getElementById('firstName'));
    formData.append('lastname', document.getElementById('lastName'));
    formData.append('birthdate', document.getElementById('bday'));
    formData.append('gender', document.getElementById('gender'));
    formData.append('interest', document.getElementById('interest'));

    console.log(formData);

    $.ajax({
        url: 'http://localhost:5000/api/register',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data) {
            console.log(data);
        },
        error: function(data) {
            console.log(data);
        },
    });
});


/*
$(document).ready(function(){
$("#reg-form").submit( function () {
console.log('aaaaa')
$.post(
$(this).attr('action'),
$(this).serialize(),
function(data){
console.log(data)
$("#results").html(data)
}
);
return false;
});
});
*/
