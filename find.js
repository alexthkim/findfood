"use strict";

var mongoose = require('mongoose');
var express = require('express');
var request = require("request");
var cheerio = require("cheerio");
var models = require('./models/models');
var bodyParser = require('body-parser')

var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)

// mongoose.connection.on('connected', function() {
//   console.log('Success: connected to MongoDb!');
// });
// mongoose.connection.on('error', function() {
//   console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
//   process.exit(1);
// });
// mongoose.connect(process.env.MONGODB_URI);

var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/food', function(req,res) {
  console.log(req.body);
})


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

var port = process.env.PORT || 3000
app.listen(port)
