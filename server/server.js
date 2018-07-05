/**
 * Socket IO
 * need http
 * Can add socket.io/socket.io.js to index.html to get the JS library
 * var socket = io();       //In script tag. Opens socket
 */

const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const publicPath = path.join(__dirname, "../public"); //Helps to link the path more cleanly
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);    //Using the http server instead of express server for socket.io
var io = socketIO(server);              //Initialize socketIO    

app.use(express.static(publicPath));

// Register an event listener
io.on("connection", (socket) => {
    console.log("New user connected");

    //second arg is the data object that you want to send
    socket.emit("newMessage", {
        from: "kelly77zhenggg",
        text: "Big party coming up in Ibiza!",
        createdAt: 098765
    })

    //This is the server listening for data on createMessage socket from client
    socket.on("createMessage", (newMessage) => {
        console.log("Created Email:", newMessage);
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    })
});


server.listen(port, () => {
    console.log(`Started on port: ${port}`);
})




