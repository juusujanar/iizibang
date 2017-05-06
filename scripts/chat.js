/**
 * Created by CARDOKAMBLA on 4/30/2017.
 */
var matches;
$(document).ready(function () {
    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/loggedIn',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
            if (data.loggedIn === false) {
                sendToLogin();
            }
        },
        error: function (data) {
            if (data.loggedIn === false) {
                sendToLogin();
            }
            console.log(data);
        }
    });
    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/successfulmatches',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            matches = data;
            console.log(matches);
        },
        error: function (data) {
            console.log(data);
        }
    });

    for (var i = 0; i < 10; i++) {
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
        chatBoxRow.setAttribute("class", "chatBoxRow")
        var image = document.createElement("IMG");
        image.setAttribute("src", "../../pictures/no_pic.jpg");
        image.setAttribute("class", "pictureOfInterest");
        image.setAttribute("alt", "pictureOfInterest");
        //         <div class="interestInfo">
        var interestInfo = document.createElement("DIV");
        interestInfo.setAttribute("class", "interestInfo");
        //         <div class="interestName"><p class="chatText">Username</p></div>
        var interestName = document.createElement("DIV");
        interestName.setAttribute("class", "interestUsername");
        var username = document.createElement("P");
        username.setAttribute("class", "chatTextLeft");
        username.innerHTML = "Username";
        interestName.appendChild(username);
        //         <div class="interestLastMessage"><p class="chatText">How you doing?</p></div>
        /*var messageBox = document.createElement("DIV");
         messageBox.setAttribute("class","messageBox");*/
        var chatText = document.createElement("P");
        chatText.setAttribute("class", "chatTextMiddle");
        chatText.innerHTML = mockMessages[mockMessages.length - 1];
        /*for (var j = 0;j<10;j++) {
         messageBox.appendChild(chatText);
         }*/

        var expandButton = document.createElement("BUTTON");
        expandButton.setAttribute("class", "expandButton")
        var downArrow = document.createElement("I");
        downArrow.setAttribute("class", "down");
        interestInfo.appendChild(interestName);
        interestInfo.appendChild(chatText);
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

var mockMessages = ["message1", "message2", "message3", "message4", "message5", "message6", "message7", "message8", "message9", "message10"];
$('div.chatBoxes').on('click', 'button.expandButton', function (e) {
// $("button.expandButton").click(function() {
    var lastMessage = $(this).parent().find('div.messageBox').children().last().text();
    if ($(this).parent().hasClass('expand')) {
        $(this).parent().removeClass('expand');
        $(this).find("i.up").attr("class", "down");
        $(this).find("i.up").remove();
        $(this).parent().find('div.messageBox').remove();
        $(this).parent().find("div.messageBox").removeClass('expand');
        var chatText = document.createElement("P");
        chatText.setAttribute("class", "chatTextMiddle");
        if (lastMessage === "") {
            chatText.innerHTML = "Say Hello!";
        } else {
            chatText.innerHTML = lastMessage;
        }

        $(this).parent().find('div.interestInfo').append(chatText);
        $(this).parent().find('.userInputPlacement').remove();
    }
    else {
        $(this).parent().addClass('expand');
        $(this).find("i.down").attr("class", "up");
        $(this).find("i.down").remove();
        $(this).parent().find("div.messageBox").addClass('expand');
        $(this).parent().find('p.chatTextMiddle').remove();
        var userInputDiv = document.createElement("DIV");
        userInputDiv.setAttribute("class", "userInputPlacement");
        var userInput = document.createElement("INPUT");
        userInput.setAttribute("type", "text");
        userInput.setAttribute("class", "fillArea");
        userInput.setAttribute("name", "userInputField");
        userInput.setAttribute("size", "1");
        userInputDiv.appendChild(userInput);
        var userSubmit = document.createElement("INPUT");
        userSubmit.setAttribute("type", "submit");
        userSubmit.setAttribute("class", "submitButton");

        userSubmit.setAttribute("value", "Send");
        userInputDiv.appendChild(userSubmit);
        var messageBox = document.createElement("DIV");
        messageBox.setAttribute("class", "messageBox");
        for (var k = 0; k < mockMessages.length; k++) {
            var message = document.createElement("P");
            if (k % 2 == 1) {
                message.setAttribute("class", "chatTextLeft")
            } else {
                message.setAttribute("class", "chatTextRight")
            }
            message.innerHTML = mockMessages[k];
            messageBox.appendChild(message);
        }
        $(this).parent().find('.interestInfo').append(messageBox);
        $(this).parent().find('.interestInfo').append(userInputDiv);
        var wtf = $(this).parent().find("div.messageBox");
        var height = wtf[0].scrollHeight;
        console.log(wtf);
        wtf.scrollTop(height);

    }
});

$('div.chatBoxes').on('click', 'input.submitButton', function (e) {
    var message = $(this).parent().find("input.fillArea").val();
    if (message !== "") {
        $(this).parent().find("input.fillArea").val("");
        //console.log(message);
        var chatText = document.createElement("P");
        chatText.setAttribute("class", "chatTextRight");
        chatText.innerHTML = message;
        console.log(chatText.innerHTML);
        $(this).parent().parent().find("div.messageBox").append(chatText);
        var wtf = $(this).parent().parent().find("div.messageBox");
        var height = wtf[0].scrollHeight;
        wtf.scrollTop(height);
        //    console.log($(this).parent().parent().find('div.interestLastMessage')[0].scrollHeight);
    }
});


/*
 $("#btn1").click(function(){
 $("#box").animate({height: "300px"});
 });
 $("#btn2").click(function(){
 $("#box").animate({height: "100px"});
 });*/
