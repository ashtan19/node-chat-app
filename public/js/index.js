var socket = io();

socket.on("connect", function () {
    console.log("Connected to server");

});

//When listening to a socket, the data is passed into the callback
socket.on("newMessage", function (message) {
    console.log("New Message:", message);
    var li = jQuery("<li></li>");               //Creating a new li for the new message
    li.text(`${message.from}: ${message.text}`);

    jQuery("#messages").append(li);
});


//The client can do something when the server disconnects
socket.on("disconnect", function () {
    console.log("Disconnected from server");
});


// Selecting the message form via jquery
// jQuery can be substituted for $
$("#message-form").on("submit", function (e) {
    e.preventDefault();

    var messageTextBox = jQuery("[name=message]");

    socket.emit("createMessage", {
        from: "User",
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
    })
});

socket.on("newLocationMessage", function(message) {
    var li = jQuery("<li></li>");               //Creating a new li for the new message
    var a = jQuery("<a target='_blank'>My Current Location</a>");

    li.text(`${message.from}: `);
    a.attr("href", message.url);                //attr = attributes in jQuery
    li.append(a);                               //append the anchor to the list item

    jQuery("#messages").append(li);
})






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