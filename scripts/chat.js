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
    /*<div class="chatBox">
            <div class="chatBoxRow">
            <img src="../../pictures/no_pic.jpg" class="pictureOfInterest" alt="pictureOfInterest">
            <div class="interestInfo">
            <div class="interestName"><p class="chatText">Username</p></div>
            <div class="interestLastMessage"><p class="chatText">How you doing?</p></div>
        </div>
        </div>
        <button class="expandButton" id="btnExpand"onclick="doSomething();" /><i class="down"></i></button>
            </div>*/
    // <div class="chatBox">
        var chatBox = document.createElement("DIV");
        chatBox.setAttribute("class", "chatBox");
        chatBox.setAttribute('data-id', i.toString());
        //chatBox.setAttribute("onClick", "openChat()");
    //         <img src="../../pictures/no_pic.jpg" class="pictureOfInterest" alt="pictureOfInterest">
        var chatBoxRow = document.createElement("DIV");
        chatBoxRow.setAttribute("class","chatBoxRow")
        var image = document.createElement("IMG");
        image.setAttribute("src","../../pictures/no_pic.jpg");
        image.setAttribute("class","pictureOfInterest");
        image.setAttribute("alt","pictureOfInterest");
        //         <div class="interestInfo">
        var interestInfo = document.createElement("DIV");
        interestInfo.setAttribute("class","interestInfo");
        //         <div class="interestName"><p class="chatText">Username</p></div>
        var interestName = document.createElement("DIV");
        interestName.setAttribute("class","interestUsername");
        var username = document.createElement("P");
        username.setAttribute("class","chatText");
        username.innerHTML = "Username";
        interestName.appendChild(username);
    //         <div class="interestLastMessage"><p class="chatText">How you doing?</p></div>
        var interestLastMessage = document.createElement("DIV");
        interestLastMessage.setAttribute("class","interestLastMessage");
        var chatText = document.createElement("P");
        interestLastMessage.appendChild(chatText);
        chatText.setAttribute("class","chatText");
        chatText.innerHTML = "How you doing?";
        var expandButton = document.createElement("BUTTON");
        expandButton.setAttribute("class","expandButton")
        var downArrow = document.createElement("I");
        downArrow.setAttribute("class","down");
        interestInfo.appendChild(interestName);
        interestInfo.appendChild(interestLastMessage);
        chatBoxRow.appendChild(image);
        chatBoxRow.appendChild(interestInfo);
        expandButton.appendChild(downArrow);


        chatBox.appendChild(chatBoxRow);
        chatBox.appendChild(expandButton);

        document.getElementById('chatBoxes').appendChild(chatBox);
    //     </div>
    //     </div>


    }
});


/*$('.chatBox').click(function(e) {
    console.log($(e.currentTarget).attr("data-id"));
});*/
/*$('div.chatBoxes').on('click', 'div.chatBox', function(e) {
    if($(e.currentTarget).attr("style") === 'height: 300px;'){
        $(e.currentTarget).animate({height: "121px"});
        var interestLastMessage = document.createElement("DIV");
        interestLastMessage.setAttribute("class","interestLastMessage");
        var chatText = document.createElement("P");
        chatText.setAttribute("class","chatText");
        chatText.innerHTML = "How you doing?";
        interestLastMessage.appendChild(chatText);
        $(this).find('.interestInfo').append(interestLastMessage);
        $(this).find('.userInputPlacement').remove();
    }else{
        $(e.currentTarget).animate({height: "300px"});
        $(this).find('.interestLastMessage').remove();
        var userInputDiv = document.createElement("DIV");
        userInputDiv.setAttribute("class","userInputPlacement");
        var userInput = document.createElement("INPUT");
        userInput.setAttribute("type","text");
        userInput.setAttribute("name","userInputField");
        userInputDiv.appendChild(userInput);
        var userSubmit = document.createElement("INPUT");
        userSubmit.setAttribute("type","submit");
        userSubmit.setAttribute("value","Send");
        userInputDiv.appendChild(userSubmit);
        $(this).find('.interestInfo').append(userInputDiv);

    }

});*/
$('div.chatBoxes').on('click', 'button.expandButton', function(e) {
// $("button.expandButton").click(function() {
    if ($(this).parent().hasClass('expand')) {
        $(this).parent().removeClass('expand')
        $(this).find("i.up").attr("class","down");
        $(this).find("i.up").remove();
    }
    else {
        $(this).parent().addClass('expand')
        $(this).find("i.down").attr("class","up");
        $(this).find("i.down").remove();

    }
});

/*
$("#btn1").click(function(){
    $("#box").animate({height: "300px"});
});
$("#btn2").click(function(){
    $("#box").animate({height: "100px"});
});*/
