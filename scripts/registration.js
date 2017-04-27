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

function getFormData(form){
    var unindexed_array = form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

function validateUserName(){
    var x = document.forms["reg-form"]["username"].value.trim();
    if (x == "") {
        alert("Username must be filled out");
        return false;
    }
    return true;
}



function validatePassword() {
    //Refrence : http://stackoverflow.com/questions/14850553/javascript-regex-for-password-containing-at-least-8-characters-1-number-1-uppe
    var re = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
    var x = document.forms["reg-form"]["password"].value.trim();
    var y = document.forms["reg-form"]["passwordConfirm"].value.trim();
    if (x == "") {
        alert("Password must be filled out");
        return false;
    }
    if(x !== y){
        alert("Passwords do not match");
        return false;
    }
    if(!re.test(x)){
        alert("Not a valid password, password must contain at least 8 characters, 1 number, 1 lowercase letter and 1 uppercase letter");
        return false;
    }
    return true;
}
function validateEmail() {
    // Refrence : http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var x = document.forms["reg-form"]["email"].value.trim();
    var y = document.forms["reg-form"]["emailConfirm"].value.trim();
    if (x == "") {
        alert("Email must be filled out");
        return false;
    }
    if(x !== y){
        alert("Email addresses must match");
        return false;
    }
    if(!re.test(x)){
        alert("Not a valid email");
        return false;
    }
    return true;
}
function validateFirstName() {
    var x = document.forms["reg-form"]["firstname"].value.trim();
    if (x == "") {
        alert("First name must be filled out");
        return false;
    }
    return true;
}
function validateLastName() {
    var x = document.forms["reg-form"]["lastname"].value.trim();
    if (x == "") {
        alert("Surname must be filled out");
        return false;
    }
    return true;
}
function validateBirthDate() {
    var birthAge = document.getElementById("birthdate").value;
    if (birthAge === ""){
        alert("Date not chosen");
        return false;
    }
    if (get_age(birthAge)< 18){
        alert("Under the required age of use.");
        return false;
    }
    if (get_age(birthAge)> 99){ //too old
        alert("I bet you are a catfish or a zombie ;) Try again");
        return false;
    }
    return true;
}

var MILLISECONDS_IN_A_YEAR = 1000*60*60*24*365;
function get_age(time){
    var date_array = time.split('-');
    var years_elapsed = (new Date() - new Date(date_array[0],date_array[1],date_array[2]))/(MILLISECONDS_IN_A_YEAR);
    return Math.floor(years_elapsed); }
function validateGender() {
    var x = document.forms["reg-form"]["gender"].value;
    if (x === "Male" || x === "Female" || x === "Other") {
        return true;
    }
    alert("Gender must be chosen");
    return false;
}
function validateInterest() {
    var x = document.forms["reg-form"]["interest"].value;
    if (x === "Men" || x === "Women" || x === "Other") {
        return true;
    }
    alert("Interest must be chosen");
    return false;
}

$('#registerButton').on('click', function (e) {
    e.preventDefault();

    /*if (!$('#email').val() === $('#emailConfirm').val()) {
        alert('Email addresses do not match!');
        return;
    }
*/
    /*if (!$('#password').val() == $('#passwordConfirm').val()) {
        alert('Passwords do not match!');
        return;
    }*/


    var form = $("#reg-form");
    var formData = getFormData(form);
    console.log(formData);
    if (
        validateUserName() === true && validatePassword() === true && validateEmail() === true &&  validateFirstName() === true && validateLastName() === true && validateBirthDate() === true &&
        validateGender() && validateInterest()
        ) {

    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/register',
        type: 'POST',
        contentType: "application/json; charset=utf-8",

        data: JSON.stringify(formData),
        success: function(data) {
            if (data.code === 200) {
                window.location.replace("https://iizibang.jjdev.eu/login");
            }
            console.log(data);

        },
        error: function (data) {
            alert('Error');
            console.log(data);
        }
    });
}
});
