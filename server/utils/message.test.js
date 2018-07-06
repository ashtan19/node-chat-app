const expect = require("expect");
var {generateMessage} = require("./message");

describe("Generate Message", () => {
    it("Should generate the correct message object", () => {
        var messageObj = generateMessage("Admin", "Maplemaple");
        expect(messageObj.from).toBe("Admin");
        expect(messageObj.text).toBe("Maplemaple");
        expect(messageObj.createdAt).toBeA("number");
    })
})