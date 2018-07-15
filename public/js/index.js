var socket = io();

socket.on("connect", function () {
    socket.emit("landOnSignIn");
})


socket.on("updateRooms", function(rooms) {
    var ul = jQuery("<ul></ul>");
    rooms.forEach(function (room) {
        ul.append(jQuery("<li></li>").text(room));
    })
    jQuery("#active-rooms").html(ul);
})