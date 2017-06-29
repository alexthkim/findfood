"use strict";

var mongoose = require('mongoose');

var uniSchema = mongoose.Schema({
  uni: String,
  meal: {
    type: String,
    enum: ['b', 'l', 'd'],
    time: Number
  },
  locations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Servery'
  }]
})

var serverySchema = mongoose.Schema({
  servery: String,
  menuItem: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem'
  }]
})

var menuItemSchema = mongoose.Schema({
  item: String,
  allergies: [String]
})

var MenuItem = mongoose.model('MenuItem', menuItemSchema);
var Servery = mongoose.model('Servery', serverySchema);
var Uni = mongoose.model('Uni', uniSchema);

module.exports = {
  Uni: Uni,
  Servery: Servery,
  MenuItem: MenuItem
}
