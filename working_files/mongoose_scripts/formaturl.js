//Node.js script that transforms coffee shop names into friendly URLs. Cool shit.

//Array of example strings to execute seach and replace on.
var exshop = "Balzac's Coffee";

var downcase = exshop.toLowerCase(); 					//Convert to lowercase
var spaces = downcase.replace(/\s/g, "-");				//Replace spaces with dashes.
var apostr = spaces.replace(/\'/ , ""); 				//Replace apostrophes

//Logs result out to console.
console.log(apostr);