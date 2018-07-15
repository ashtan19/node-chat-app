const expect = require("expect");
const {Users} = require("./users");

describe("Users", () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "1",
            name: "Kathy",
            room: "Tea"
        }, {
            id: "2",
            name: "James",
            room: "Coffee"
        }, {
            id: "3",
            name: "Grace",
            room: "Tea"
        }]
    })

    it("Should add new user", () => {
        var users = new Users();
        var user = {id: "1", name: "Maple", room: "A"};
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(resUser).toEqual(user);
        expect(users.users).toEqual([user]);
    });

    it("Should return users of a room", () => {
        var userList = users.getUserList("Tea");
        expect(userList).toEqual(["Kathy", "Grace"]);
    });

    it("Should remove a user", () => {
        var user = users.removeUser("3");
        expect(user.id).toBe("3");
        expect(users.users).toEqual([{
            id: "1",
            name: "Kathy",
            room: "Tea"
        }, {
            id: "2",
            name: "James",
            room: "Coffee"
        }]);
    });

    it("Should not remove user", () => {
        var user = users.removeUser("4");
        expect(user).toNotExist();
        expect(users.users).toEqual([{
            id: "1",
            name: "Kathy",
            room: "Tea"
        }, {
            id: "2",
            name: "James",
            room: "Coffee"
        }, {
            id: "3",
            name: "Grace",
            room: "Tea"
        }])
        
    });

    it("Should find user", () => {
        var user = users.getUser("1");
        expect(user).toEqual({
            id: "1",
            name: "Kathy",
            room: "Tea"
        });
    });

    it("Should not find a user", () => {
        var user = users.getUser("4");
        expect(user).toNotExist();        
    });

    it("Should filter unique rooms", () => {
        var uniqueRooms = users.getUniqueRooms();
        expect(uniqueRooms).toEqual(["Tea", "Coffee"]);
    })

    it("Should not be any rooms", () => {
        users.users = [];
        var uniqueRooms = users.getUniqueRooms();
        expect(uniqueRooms).toEqual([]);
    })

})