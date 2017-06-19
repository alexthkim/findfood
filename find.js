"use strict";

var FileReader = require('filereader');
var mongoose = require('mongoose');
var express = require('express');
var program = require('commander');
var $ = require("jquery");
var parseHTML = require('parseHTML');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
var fileReader = new FileReader();
var models = require('./models/models');
var Menu = models.Menu;

mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
  process.exit(1);
});
mongoose.connect(process.env.MONGODB_URI);


// exports.textInput = function (req, res) {
//     var text = req.query.data;
//     console.log(text);
//     fs.writeFile('./public/files/text.txt', text, function (err) {
//         if (err) {
//             return console.log('there is an error');
//         }
//
//         console.log('the file was saved');
//         respondWithFile();
//     });
//
//     function respondWithFile() {
//         console.log('sending file...');
//         res.download('./public/files/text.txt');
//
//     };
// };



var app = express();

program.command('show')
  .description("")
  .action(show);

program.parse(process.argv);

if (process.argv.length === 2) {
  program.help();
}

function show() {
  console.log("hello");
  // httpGetAsync("http://dining.rice.edu", function (response) {
  //   var newMenu = new menu ({
  //     university: "Rice",
  //     menu: response
  //   })
  //   newMenu.save(function(err) {
  //     if (err) {
  //       console.log("Errors")
  //     } else {
  //       console.log("success");
  //       //mongoose.connection.close();
  //     }
  //   })
  //   const dom = new JSDOM(response);
  //   console.log(response);
  //   var serveryList = dom.window.document.getElementsByClassName("servery-title");
  //   for (var a = 0; a < serveryList.length; a++) {
  //     console.log(serveryList[a].textContent);
  //   }
  // })
  Menu.findOne({"university":"Rice"}, function(err, indvMenu) {
    if (err) {
      console.log("University not found")
    } else {
        const desires = "pasta";
        const dom = new JSDOM(indvMenu);
        var serveryList = dom.window.document.getElementsByClassName("menu-item");
        console.log("You wanted: " + desires);
        for (var a = 0; a < serveryList.length; a++) {
          var menuItem = serveryList[a].textContent;
          if (menuItem.toLowerCase().includes(desires)) {
            var location = serveryList[a].parentNode.parentNode.previousElementSibling.id
            console.log(menuItem + " @ " + location.replace("@", ""));
          }
        }
    }
  });
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest;
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
