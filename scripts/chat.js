/**
 * Created by CARDOKAMBLA on 4/30/2017.
 */
$(document).ready(function() {
    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/loggedIn',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            console.log(data);
            if(data.loggedIn === false){
                sendToLogin();
            }
        },
        error: function(data) {
            if(data.loggedIn === false){
                sendToLogin();
            }
            console.log(data);
        }
    });
    for (var i = 0;i<10;i++){
    // <div class="chatBox">
        var chatBox = document.createElement("DIV");
        chatBox.setAttribute("class", "chatBox");
        chatBox.setAttribute('data-id', '1');
        //chatBox.setAttribute("onClick", "openChat()");
    //         <img src="../../pictures/no_pic.jpg" class="pictureOfInterest" alt="pictureOfInterest">
        var image = document.createElement("IMG");
        image.setAttribute("src","../../pictures/no_pic.jpg");
        image.setAttribute("class","pictureOfInterest");
        image.setAttribute("alt","pictureOfInterest");
        //         <div class="interestInfo">
        var interestInfo = document.createElement("DIV");
        interestInfo.setAttribute("class","interestInfo");
        //         <div class="interestName"><p class="chatText">Username</p></div>
        var interestName = document.createElement("DIV");
        interestName.setAttribute("class","interestInfo");
        var username = document.createElement("P");
        username.setAttribute("class","chatText");
        username.innerHTML = "Username";
        interestName.appendChild(username);
    //         <div class="interestLastMessage"><p class="chatText">How you doing?</p></div>
        var interestLastMessage = document.createElement("DIV");
        interestLastMessage.setAttribute("class","interestLastMessage");
        var chatText = document.createElement("P");
        chatText.setAttribute("class","chatText");
        chatText.innerHTML = "How you doing?";
        interestLastMessage.appendChild(chatText);
        interestInfo.appendChild(interestName);
        interestInfo.appendChild(interestLastMessage);
        chatBox.appendChild(image);
        chatBox.appendChild(interestInfo);

        document.getElementById('chatBoxes').appendChild(chatBox);
    //     </div>
    //     </div>


    }
});


$('.chatBox').click(function(e) {
    $(e.currentTarget).data('id')
});
