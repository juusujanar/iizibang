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
            alert('Success');
            console.log(data);
        },
        error: function(data) {
            alert('Error');
            console.log(data);
        }
    });

});