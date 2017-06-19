"use strict";

var mongoose = require('mongoose');

var Menu = mongoose.model('Menu', {
  university: String,
  menu: String
});

module.exports = {
  Menu: Menu
}
