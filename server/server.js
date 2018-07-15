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
const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} =require("./utils/validation");
const {Users} = require("./utils/users");

var app = express();
var server = http.createServer(app);    //Using the http server instead of express server for socket.io
var io = socketIO(server);              //Initialize socketIO    
var users = new Users();

app.use(express.static(publicPath));

// Register an event listener
io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("join", (params, callback) => {

        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback("Name and room name are required");
        }
        socket.join(params.room);

        users.removeUser(socket.id);            //Updating user array
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit("updateUserList", users.getUserList(params.room));

        socket.emit("newMessage", generateMessage("admin", "Welcome to the chat app"));
        socket.broadcast.to(params.room).emit("newMessage", generateMessage("admin", `${params.name} has joined!`));

        callback();
    })


    //This is the server listening for data on createMessage socket from client
    //Call the callback to send back the acknowledgement
    socket.on("createMessage", (message, callback) => {
        console.log("Created New Message:", message);
        //io.emit emits a event to every connection 
        io.emit("newMessage", generateMessage(message.from, message.text));
        callback();
    });

    socket.on("createLocationMessage", (coords) => {
        io.emit("newLocationMessage", generateLocationMessage("admin", coords.latitude, coords.longitude));
    })

    socket.on("disconnect", () => {
        var user = users.removeUser(socket.id);            //Updating user array
        
        if (user) {
            io.to(user.room).emit("updateUserList", users.getUserList(user.room));            
            io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left the room`));
        }
        console.log("Client disconnected");    
    })
});


server.listen(port, () => {
    console.log(`Started on port: ${port}`);
})



    // //second arg is the data object that you want to send
    // socket.emit("newMessage", {
    //     from: "kelly77zhenggg",
    //     text: "Big party coming up in Ibiza!",
    //     createdAt: 098765
    // })


    //broadcast will emit an event to everyone except for the person that created the event
    // socket.broadcast.emit("newMessage", {
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    // })
