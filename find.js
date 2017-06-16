"use strict";

var express = require('express');
var program = require('commander');
var $ = require("jquery");
var parseHTML = require('parseHTML');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var app = express();

program.command('show')
  .description("")
  .action(show);

program.parse(process.argv);

if (process.argv.length === 2) {
  program.help();
}

function show() {
  console.log('hello');
  httpGetAsync('http://dining.rice.edu/', function (response) {
    const dom = new JSDOM(response);
    console.log(dom.window.document.getElementById("Amb.Cafe").textContent); // "Hello world"
  })
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
