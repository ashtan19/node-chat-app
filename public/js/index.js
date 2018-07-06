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

    socket.emit("createMessage", {
        from: "User",
        text: jQuery("[name=message]").val()
    }, function (data) {
        console.log("Successfully sent message", data);
    })
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