/*


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
}*/
$(document).ready(function(){
    $("reg-form").submit( function () {
        $.post(
            "#action",
            $(this).serialize(),
            function(data){
                $("#results").html(data)
            }
        );
        return false;
    });
});


