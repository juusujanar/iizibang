/**
 * Created by CARDOKAMBLA on 4/30/2017.
 */
var matches;
var chatMessages;

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
            console.log(data);
            showMatches(matches);
            for (var i = 0; i < matches.length; i++) {
                (function (index) {
                    var matchID = matches[index].id;
                    $.ajax({
                        url: 'https://iizibang.jjdev.eu/api/chathistory?matchid='+matchID,
                        type: 'GET',
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            chatMessages = data;
                            console.log(data);
                            var searchID = "#"+matchID;
                            var lastMessage = chatMessages[chatMessages.length-1];
                            var chatText = document.createElement("P");
                            chatText.setAttribute("class", "chatTextMiddle");
                            if (data.length <= 0) {
                                chatText.innerHTML = "Say Hello!";
                            } else {
                                chatText.innerHTML = lastMessage.text;
                            }
                            $(searchID).append(chatText)


                        },
                        error: function (data) {
                            console.log(data);
                        }
                    });
                })(i)

            }
        },
        error: function (data) {
            console.log(data);
        }
    });

});

function showMatches (matches,chatMessages) {
    for (var i = 0; i < matches.length; i++) {
        var chatBox = document.createElement("DIV");
        chatBox.setAttribute("class", "chatBox");
        var chatBoxRow = document.createElement("DIV");
        chatBoxRow.setAttribute("class", "chatBoxRow")
        var image = document.createElement("IMG");
        image.setAttribute("src", "../../pictures/no_pic.jpg");
        image.setAttribute("class", "pictureOfInterest");
        image.setAttribute("alt", "pictureOfInterest");
        var interestInfo = document.createElement("DIV");
        interestInfo.setAttribute("class", "interestInfo");
        interestInfo.id = matches[i].id;
        var interestName = document.createElement("DIV");
        interestName.setAttribute("class", "interestUsername");
        var username = document.createElement("P");
        username.setAttribute("class", "userNameToTheLeft");
        username.innerHTML = matches[i].username;
        interestName.appendChild(username);
        var expandButton = document.createElement("BUTTON");
        expandButton.setAttribute("class", "expandButton")
        var downArrow = document.createElement("I");
        downArrow.setAttribute("class", "down");
        interestInfo.appendChild(interestName);
        chatBoxRow.appendChild(image);
        chatBoxRow.appendChild(interestInfo);
        expandButton.appendChild(downArrow);
        chatBox.appendChild(chatBoxRow);
        chatBox.appendChild(expandButton);
        document.getElementById('chatBoxes').appendChild(chatBox);
    }
}



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
        var matchID = $(this).parent().find(".interestInfo").id;
        $.ajax({
            url: 'https://iizibang.jjdev.eu/api/chathistory?matchid='+matchID,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                chatMessages = data;
                console.log(data);
                var searchID = "#"+matchID;
                var lastMessage = chatMessages[chatMessages.length-1];
                var chatText = document.createElement("P");
                chatText.setAttribute("class", "chatTextMiddle");
                if (data.length <= 0) {
                    chatText.innerHTML = "Say Hello!";
                } else {
                    chatText.innerHTML = lastMessage.text;
                }
                $(this).parent().find(searchID).append(chatText);
            },
            error: function (data) {
                console.log(data);
            }
        });
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
