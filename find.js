"use strict";

var mongoose = require('mongoose');
var express = require('express');
var program = require('commander');
var request = require("request");
var cheerio = require("cheerio");
var models = require('./models/models');
var Menu = models.Menu;

// mongoose.connection.on('connected', function() {
//   console.log('Success: connected to MongoDb!');
// });
// mongoose.connection.on('error', function() {
//   console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
//   process.exit(1);
// });
// mongoose.connect(process.env.MONGODB_URI);


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
  request({
    uri: "http://dining.rice.edu",
  }, function(error, response, body) {
    var $ = cheerio.load(body);

    $(".item").each(function() {
      var link = $(this);

      console.log(link.find('.servery-title').attr('id'))
      link.find('.menu-item').each(function() {
        console.log($(this).text());
      })
      console.log();
    });
  });
}



// function show() {
//   console.log("hello");
//   httpGetAsync("http://dining.rice.edu", function (response) {
//     const $ = cheerio.load(response);
//     //var stuff = $('.owl-stage-outer').toArray();
//     console.log($.html('.owl-stage-outer'));


    // var newMenu = new menu ({
    //   university: "Rice",
    //   menu: response
    // })
    // newMenu.save(function(err) {
    //   if (err) {
    //     console.log("Errors")
    //   } else {
    //     console.log("success");
    //     //mongoose.connection.close();
    //   }
    // })
  //   const dom = new JSDOM(response);
  //   console.log(response);
  //   var serveryList = dom.window.document.getElementsByClassName("servery-title");
  //   for (var a = 0; a < serveryList.length; a++) {
  //     console.log(serveryList[a].textContent);
  //})
  // Menu.findOne({"university":"Rice"}, function(err, indvMenu) {
  //   if (err) {
  //     console.log("University not found")
  //   } else {
  //       const desires = "pasta";
  //       const dom = new JSDOM(indvMenu);
  //       var serveryList = dom.window.document.getElementsByClassName("menu-item");
  //       console.log("You wanted: " + desires);
  //       for (var a = 0; a < serveryList.length; a++) {
  //         var menuItem = serveryList[a].textContent;
  //         if (menuItem.toLowerCase().includes(desires)) {
  //           var location = serveryList[a].parentNode.parentNode.previousElementSibling.id
  //           console.log(menuItem + " @ " + location.replace("@", ""));
  //         }
  //       }
  //   }
  // });
//}
