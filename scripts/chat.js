/**
 * Created by CARDOKAMBLA on 4/30/2017.
 */
var matches = {};
var chatMessages;
var myAccountID;
$(document).ready(function () {
    $.ajax({
        url: 'https://iizibang.jjdev.eu/api/loggedIn',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.loggedIn === false) {
                sendToLogin();
            }
        },
        error: function (data) {
            if (data.loggedIn === false) {
                sendToLogin();
            }
        }
    });

    $("input.fillArea").keypress(function( event ) {
        if ( event.which == 13 ) {
            $(this).parent().find("input.submitButton").click();
        }
    });
});

function showMatches (matches) {
    for (var i = 0; i < matches.length; i++) {
        var chatBox = document.createElement("DIV");
        chatBox.setAttribute("class", "chatBox");
        var chatBoxRow = document.createElement("DIV");
        chatBoxRow.setAttribute("class", "chatBoxRow");
        var image = document.createElement("IMG");
        if (matches[i].profile_pic === null) {
            image.setAttribute("src", "../../pictures/no_pic.jpg");
        }else{
            image.setAttribute("src", "https://iizibang.jjdev.eu/uploads/profilepics/"+matches[i].profile_pic);
        }

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
        expandButton.setAttribute("class", "expandButton");
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
function addMatch(profile_pic, id, userName){
    var chatBoxWithRemove = document.createElement("DIV");
    chatBoxWithRemove.setAttribute("class","chatBoxWithRemoveButton");
    var chatBox = document.createElement("DIV");
    chatBox.setAttribute("class", "chatBox");
    var chatBoxRow = document.createElement("DIV");
    chatBoxRow.setAttribute("class", "chatBoxRow");
    var image = document.createElement("IMG");
    if (profile_pic === null) {
        image.setAttribute("src", "../../pictures/no_pic.jpg");
    }else{
        image.setAttribute("src", "https://iizibang.jjdev.eu/uploads/profilepics/"+profile_pic);
    }

    image.setAttribute("class", "pictureOfInterest");
    image.setAttribute("alt", "pictureOfInterest");
    var interestInfo = document.createElement("DIV");
    var lastMessageP = document.createElement("P");
    lastMessageP.setAttribute("class","chatTextMiddle");
    interestInfo.setAttribute("class", "interestInfo");
    interestInfo.id = id;
    var interestName = document.createElement("DIV");
    interestName.setAttribute("class", "interestUsername");
    var username = document.createElement("P");
    username.setAttribute("class", "userNameToTheLeft");
    username.innerHTML = userName;
    interestName.appendChild(username);
    var expandButton = document.createElement("BUTTON");
    expandButton.setAttribute("class", "expandButton");
    var downArrow = document.createElement("I");
    downArrow.setAttribute("class", "down");
    interestInfo.appendChild(interestName);
    interestInfo.appendChild(lastMessageP);
    chatBoxRow.appendChild(image);
    chatBoxRow.appendChild(interestInfo);
    expandButton.appendChild(downArrow);
    chatBox.appendChild(chatBoxRow);
    chatBox.appendChild(expandButton);
    var removeButton = document.createElement("DIV");
    removeButton.setAttribute("class","deleteButton");
    var removeX = document.createElement("H3");
    removeX.innerHTML="X";
    removeX.addEventListener('click',function (e) {
        var matchID = $(this).parent().parent().find(".interestInfo").attr("id");
        $.ajax({
            url: 'https://iizibang.jjdev.eu/api/removesuccessfulmatch?matchid=' + matchID,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            success: function (data) {
            },
            error: function (data) {
                alert('Error');
            }
        });
        $(this).parent().parent().remove();

    });
    removeButton.appendChild(removeX);
    chatBoxWithRemove.appendChild(chatBox);
    chatBoxWithRemove.appendChild(removeButton);
    document.getElementById('chatBoxes').appendChild(chatBoxWithRemove);

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
        $(this).parent().find('.userInputPlacement').remove();
        var lastMessageP = document.createElement("P");
        lastMessageP.setAttribute("class","chatTextMiddle");
        if(lastMessage === "" || lastMessage == ""){
            lastMessageP.innerHTML = "Say Hello!";
        }else{
            lastMessageP.innerHTML = lastMessage;
        }

        $(this).parent().find('.interestInfo').append(lastMessageP);
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
        
     /*   userInput.addEventListener('keypress',function(e){
            if (e.keyCode === 13){
                $(this).parent().find(".submitButton").click();
                /!*var message = $(this).val();
                var matchID = $(this).attr("id");
                if (message !== "") {
                    $(this).parent().find("input.fillArea").val("");
                    var chatText = document.createElement("P");
                    chatText.setAttribute("class", "chatTextRight");
                    chatText.innerHTML = message;
                    $(this).parent().parent().find("div.messageBox").append(chatText);
                    $.ajax({
                        url: 'https://iizibang.jjdev.eu/api/sendchatmessage?matchid=' + matchID + "&textmessage=" + message,
                        type: 'POST',
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                        },
                        error: function (data) {
                            alert('Error');
                        }
                    });
                    var wtf = $(this).parent().parent().find("div.messageBox");
                    var height = wtf[0].scrollHeight;
                    wtf.scrollTop(height);*!/

            }
        });*/
        userInput.setAttribute("size", "1");
        userInputDiv.appendChild(userInput);
        var userSubmit = document.createElement("INPUT");
        userSubmit.setAttribute("type", "submit");
        userSubmit.setAttribute("class", "submitButton");
        userSubmit.setAttribute("value", "Send");
        userInputDiv.appendChild(userSubmit);
        var messageBox = document.createElement("DIV");
        messageBox.setAttribute("class", "messageBox");
        $(this).parent().find('.interestInfo').append(messageBox);
        $(this).parent().find('.interestInfo').append(userInputDiv);
        var matchID = $(this).parent().find(".interestInfo").attr("id");
        var _this = this;
        $.ajax({
            url: 'https://iizibang.jjdev.eu/api/chathistory?matchid='+matchID,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                chatMessages = data;
                var searchID = "#"+matchID;
                for (var k = 0; k < chatMessages.length; k++) {
                    var message = document.createElement("P");
                    if (chatMessages[k].sender == matchID) {
                        myAccountID = chatMessages[k].receiver;
                        message.setAttribute("class", "chatTextLeft");
                    } else {
                        message.setAttribute("class", "chatTextRight");
                    }
                    message.innerHTML = chatMessages[k].text;
                    messageBox.appendChild(message);
                }
                var wtf = $(_this).parent().find("div.messageBox");
                var height = wtf[0].scrollHeight;
                wtf.scrollTop(height);
            },
            error: function (data) {
            }
        });



    }
});

$('div.chatBoxes').on('click', 'input.submitButton', function (e) {
    var message = $(this).parent().find("input.fillArea").val();
    var matchID = $(this).parent().parent().parent().find(".interestInfo").attr("id");
    if (message !== "") {
        $(this).parent().find("input.fillArea").val("");
        var chatText = document.createElement("P");
        chatText.setAttribute("class", "chatTextRight");
        chatText.innerHTML = message;
        $(this).parent().parent().find("div.messageBox").append(chatText);
        $.ajax({
            url: 'https://iizibang.jjdev.eu/api/sendchatmessage?matchid='+matchID+"&textmessage="+message,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            success: function(data) {
            },
            error: function (data) {
                alert('Error');
            }
        });
        var wtf = $(this).parent().parent().find("div.messageBox");
        var height = wtf[0].scrollHeight;
        wtf.scrollTop(height);
    }
});

$('div.chatBoxes').on('keypress', 'input.fillArea', function (e) {
    var message = $(this).val();
    var matchID = $(this).parent().parent().parent().find(".interestInfo").attr("id");
    if (e.keyCode === 13) {
        if (message !== "") {
            $(this).parent().find("input.fillArea").val("");
            var chatText = document.createElement("P");
            chatText.setAttribute("class", "chatTextRight");
            chatText.innerHTML = message;
            $(this).parent().parent().find("div.messageBox").append(chatText);
            $.ajax({
                url: 'https://iizibang.jjdev.eu/api/sendchatmessage?matchid=' + matchID + "&textmessage=" + message,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                },
                error: function (data) {
                    alert('Error');
                }
            });
            var wtf = $(this).parent().parent().find("div.messageBox");
            var height = wtf[0].scrollHeight;
            wtf.scrollTop(height);
        }
    }
});

(function(){
    var poll = function(){
        $.ajax({
            url: 'https://iizibang.jjdev.eu/api/successfulmatches',
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                matches = data;
                if (matches.length > $(".chatBoxes").children().length){
                    for (var j = 0; j < matches.length; j++) {
                        if ($("#"+matches[j].id).length === 0){
                            addMatch(matches[j].profile_pic,matches[j].id,matches[j].username)
                        }
                    }
                }
                if (matches.length === 0){
                    if ($("#noResults").length == 0) {
                        var noResultsFound = document.createElement("H3");
                        noResultsFound.innerHTML = "No matches ... yet!";
                        noResultsFound.id = "noResults";
                        noResultsFound.setAttribute("class","noResultsFound");
                        document.getElementById('chatBoxes').appendChild(noResultsFound);
                    }
                }else{
                    if ($("#noResults").length != 0){
                        $("#noResults").remove();
                    }
                }
                for (var i = 0; i < matches.length; i++) {
                    (function (index) {
                        var matchID = matches[index].id;
                        $.ajax({
                            url: 'https://iizibang.jjdev.eu/api/chathistory?matchid=' + matchID,
                            type: 'GET',
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                chatMessages = data;
                                var searchID = "#" + matchID;
                                if (chatMessages.length == 0){
                                    $(searchID).find("p.chatTextMiddle").text("Say Hello!");
                                }else{
                                    var lastMessage = chatMessages[chatMessages.length - 1];
                                    if ($(searchID).find(".chatTextMiddle").length === 0) {
                                        if ($(searchID).find("p.chatTextMiddle").length !== 0){
                                            $(searchID).find("p.chatTextMiddle").remove();
                                        }
                                        //Kindlalt mesasgeBox siis
                                        //if ($(searchID).find(".messageBox").children().last().text() !== lastMessage) {

                                        for (var k = $(searchID).find(".messageBox").children().length; k < chatMessages.length; k++) {
                                            var message = document.createElement("P");
                                            if (chatMessages[k].sender == matchID) {
                                                myAccountID = chatMessages[k].receiver;
                                                message.setAttribute("class", "chatTextLeft");
                                            } else {
                                                message.setAttribute("class", "chatTextRight");
                                            }
                                            message.innerHTML = chatMessages[k].text;
                                            $(searchID).find(".messageBox").append(message);

                                            /*var wtf = $(searchID).find(".messageBox");
                                             var height = wtf[0].scrollHeight;

                                             wtf.scrollTop(height);*/
                                        }

                                    } else {
                                        if (lastMessage.text !== $(searchID).find("p.chatTextMiddle").text() && !(lastMessage === "" || lastMessage == "")) {
                                            // Last message siis
                                            $(searchID).find("p.chatTextMiddle").text(lastMessage.text);
                                        }

                                    }
                                }

                            },
                            error: function (data) {

                            }
                        });
                    })(i)

                }
            },
            error: function (data) {
            }
        });



        };


    poll();
    setInterval(function(){
        poll();
    }, 5000);
})();



/*
 $("#btn1").click(function(){
 $("#box").animate({height: "300px"});
 });
 $("#btn2").click(function(){
 $("#box").animate({height: "100px"});
 });*/
