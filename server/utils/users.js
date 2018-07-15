// ES6 classes
const _ = require("lodash");

class Users {
    constructor () {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user = this.getUser(id)
        
        if(user) {
            this.users = _.reject(this.users, (user) => user.id === id);
        }
        return user;
    }

    getUser(id) {
        var user = _.find(this.users, {id:id});
        return user;
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room); //Will add user to users if user.room matches
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }

}  

module.exports = {
    Users
}






// class Person {
//     constructor (id, name, room) {
//         this.id = id;
//         this.name = name;
//         this.room = room;
//     }
//     getUserDescription() {
//         return `${this.name} is in Room ${this.room}`;
//     }
// }

// var me = new Person(1, "Maple", "a");


// console.log("this.name", me.name);
// console.log("User Description:", me.getUserDescription());