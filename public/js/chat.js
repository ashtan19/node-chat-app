var socket = io();

function scrollToBottom() {
    //Selectors
    var messages = jQuery("#messages");
    var newMessage = messages.children("li:last-child");
    //Heights
    var clientHeight = messages.prop("clientHeight");   //These are all avaiable as properties 
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight")
    var newMessageHeight = newMessage.innerHeight();    //Calculate the height of the html element
    var lastMessageHeight = newMessage.prev().innerHeight(); //

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight>= scrollHeight) {
        messages.scrollTop(scrollHeight).delay("slow");
    }
}



socket.on("connect", function () {
    console.log("Connected to server");
    var params = jQuery.deparam(window.location.search); //get the parameters from the url

    // This event is emitted by the client and listened by the server
    // When server gets this event, it will set up a room 
    socket.emit("join", params, function(err) {
        if (err) {
            alert(err);
            window.location.href = "/";         //Send user back to main page by changing the href
        } else {
           console.log("No errors"); 
        }
    })

});

//The client can do something when the server disconnects
socket.on("disconnect", function () {
    console.log("Disconnected from server");
});

socket.on("updateUserList", function (users) {
    var ol = jQuery("<ol></ol>");
    users.forEach(function (user) {
        ol.append(jQuery("<li></li>").text(user));
    })
    jQuery("#users").html(ol);
})

//When listening to a socket, the data is passed into the callback
socket.on("newMessage", function (message) {
    var formattedTime = moment(message.createdAt).format("h:mm a");    
    var template = jQuery("#message-template").html();      //Get template from index.html
    var html = Mustache.render(template, {                  //Pass object with things you want rendered
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });

    jQuery("#messages").append(html);
    scrollToBottom();
});

socket.on("newLocationMessage", function(message) {
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = jQuery("#location-message-template").html();      //Get template from index.html
    var html = Mustache.render(template, {                           //Pass object with things you want rendered
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    jQuery("#messages").append(html);
    scrollToBottom();

});

// Selecting the message form via jquery
// jQuery can be substituted for $
$("#message-form").on("submit", function (e) {
    e.preventDefault();

    var messageTextBox = jQuery("[name=message]");

    socket.emit("createMessage", {
        text: messageTextBox.val()
    }, function (data) {
        //console.log("Successfully sent message", data);
        messageTextBox.val("");
    })
});

// Geolocation function
var locationButton = jQuery("#send-location");          // Getting the tag 
locationButton.on("click", function() {
    if(!navigator.geolocation) {
        return alert("Geolocation not supported by your browser.");
    }

    locationButton.attr("disabled","disabled").text("Sending Location...");         //changing attribute of location button

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr("disabled").text("Send Location");          //remove the attribute
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        console.log(position);
    }, function() {
        locationButton.removeAttr("disabled").text("Send Location");
        alert("Unable to getch location");
    });
});








// $("#message-form").on("click", function() {
//     $("#message-form").hide(2000);
// })

// socket.emit("createMessage", {
//     to: "queez00",
//     text: "I am down to go to Ibiza!"
// })

// socket.emit("createMessage", {
//     from: "xiaxia",
//     text: "你好"
// }, function (data) {
//     console.log("Got it", data);              //Callback for the return acknowledgement
// });

// var li = jQuery("<li></li>");               //Creating a new li for the new message
// var a = jQuery("<a target='_blank'>My Current Location</a>");

// li.text(`${message.from} ${formattedTime}: `);
// a.attr("href", message.url);                //attr = attributes in jQuery
// li.append(a);                               //append the anchor to the list item

// jQuery("#messages").append(li);