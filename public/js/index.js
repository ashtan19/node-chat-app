var socket = io();

socket.on("connect", function () {
    console.log("Connected to server");

    socket.emit("createMessage", {
        to: "queez00",
        text: "I am down to go to Ibiza!"
    })
});

//When listening to a socket, the data is passed into the callback
socket.on("newMessage", function (message) {
    console.log("New Message:", message);
});

//The client can do something when the server disconnects
socket.on("disconnect", function () {
    console.log("Disconnected from server");
});


