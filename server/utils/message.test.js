const expect = require("expect");
var {generateMessage, generateLocationMessage} = require("./message");

describe("Generate Message", () => {
    it("Should generate the correct message object", () => {
        var messageObj = generateMessage("Admin", "Maplemaple");
        expect(messageObj.from).toBe("Admin");
        expect(messageObj.text).toBe("Maplemaple");
        expect(messageObj.createdAt).toBeA("number");
    })
});

describe("Generate a Location Message", () => {
    it("Should generate the correct message with a url", () => {
        var messageObj = generateLocationMessage("admin", 5, 27);
        expect(messageObj).toInclude({
            from: "admin",
            url: `https://www.google.ca/maps/?q=5,27`,
        });
        expect(messageObj.createdAt).toBeA("number");
    })
})