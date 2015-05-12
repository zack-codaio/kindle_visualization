/**
 * Created by zackaman on 3/17/15.
 */


var cheerio = require('cheerio');
var fs = require('fs');
var util = require('util');
var highlights = require('./highlights.json');

console.log(highlights);

for(var i = 0; i < highlights.titles.length; i++) {
    var text = ""
    for (var j = 0; j < highlights.titles[i].notes.length; j++) {
        text += highlights.titles[i].notes[j]
        text += "\r\r";
    }
    var outputFilename = './raw_notes/' + highlights.titles[i].title + ".txt";
    fs.writeFile(outputFilename, text, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("File saved to " + outputFilename);
        };
    })
}