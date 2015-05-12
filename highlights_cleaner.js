/**
 * Created by zackaman on 3/11/15.
 */


var cheerio = require('cheerio');
var fs = require('fs');
var util = require('util');

var highlights = {};
var titles = highlights.titles = [];

//parse html using Cheerio

fs.readFile('./my_highlights.html', 'utf8', function(err, data){
    if(err){
        console.log('error reading file');
        return -1;
    }

    $ = cheerio.load(data);

//console.log($);

    $('.bookMain').each(function(i, elem){
        //console.log($('.title a', elem).text())
        //titles[i] = ($('.title a', elem).text());
        //push object with
        var book = {};
        //title
        book.title = ($('.title a', elem).text());
        book.author = ($('.author', elem).text());
        book.lastHighlighted = ($('.lastHighlighted', elem).text());
        book.numHighlights = parseInt(($('.yourHighlightsStats div span', elem).first().text()));
        book.notes = [];
        //date edited
        //total notes
        //notes[]

        titles[i] = book;
    });



    var scraped_highlights = [];
    $('.highlight').each(function(i, elem){
        if(typeof(elem.children[0]) != "undefined"){
            //console.log(elem.children[0].data);
            if(elem.children[0].data == ""){
                console.log("found empty string highlight");
                scraped_highlights.push("EMPTY STRING");
            }
            else{
                scraped_highlights.push(elem.children[0].data);
            }
        }
    });
    //var scraped_highlights = $('.highlight').text();
    //for(var i = 0; i < scraped_highlights.length; i++){
    //    console.log(scraped_highlights[i]);
    //}

    for(var i = 0; i < highlights.titles.length; i++){
        for(var j = 0; j < highlights.titles[i].numHighlights; j++){
            highlights.titles[i].notes.push(scraped_highlights.shift());
        }
    }


    console.log(util.inspect(highlights, {depth:null}));

    var outputFilename = 'highlights.json';

    fs.writeFile(outputFilename, JSON.stringify(highlights, null, 4), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("JSON saved to " + outputFilename);
        }
    });
});

