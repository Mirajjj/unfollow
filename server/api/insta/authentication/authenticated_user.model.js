'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var AuthenticatedUser = new Schema({
  id: String,
  access_token: String,
  data: String
});

module.exports = mongoose.model('authenticated_users', AuthenticatedUser);
