var moment = require("moment");

var date = moment();

//Format the current time
console.log(date.format("MMM YYYY"));        //Shorthand version of the month eg. JUL
console.log(date.format("MMMM Do, YYYY "));

//Add & subtract time
var addedTime = date.add(7, "days");
console.log(addedTime.format("MMM Do, YYYY"));

//Printing the time
var subtractedTime = date.subtract(2, "h");
console.log(subtractedTime.format("h:mm a"));

//Get the timestamp & get a moment back
var createdAt = 1234;
var date2 = moment(createdAt);
console.log(date2.format("h:mm a"));

//Get the time stamp
var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);
