var expect = require("expect");
var {isRealString} = require("./validation.js");

describe("Check if Real String", () => {
    it("Should reject non-string values", () => {
        var number = 10;
        expect(isRealString(number)).toBe(false);
    });

    it("Should reject strings with only spaces", () => {
        var spaces = "     ";
        expect(isRealString(spaces)).toBe(false);
    });

    it("Should allow strings with non-space characters", () => {
        var name = "Maple";
        expect(isRealString(name)).toBe(true);
    });
})