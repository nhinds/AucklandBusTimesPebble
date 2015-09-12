var detectcloud = require('detectcloud');
var FAKE_AJAX = detectcloud.isCloudPebble();

if (FAKE_AJAX) {
  this.exports = require('fakejax');
} else {
  this.exports = require('ajax');
}