// Check if password and email values are equal.

$('#password, #passwordConfirm').on('keyup', function () {
    if ($('#password').val() == $('#passwordConfirm').val()) {
        $('#passwordMessage').html('&#10004;').css('color', 'green');
    } else
        $('#passwordMessage').html('&#10008;').css('color', 'red');
});

$('#email, #emailConfirm').on('keyup', function () {
    if ($('#email').val() == $('#emailConfirm').val()) {
        $('#emailMessage').html('&#10004;').css('color', 'green');
    } else
        $('#emailMessage').html('&#10008;').css('color', 'red');
});


function submitValues(){
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var passwordConfirmation = document.getElementById('passwordConfirm');
    var email = document.getElementById('email');
    var emailConfirm = document.getElementById('emailConfirm');
    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    var bday = document.getElementById('bday');
    var gender = document.getElementsByClassName('gender');
    var sexualInterest = document.getElementsByClassName('interest');

    console.log(username);
    console.log(password);
    console.log(passwordConfirmation);
    console.log(email);
    console.log(emailConfirm);
    console.log(firstName);
    console.log(lastName);
    console.log(bday);
    console.log(gender);
    console.log(sexualInterest);
}
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
