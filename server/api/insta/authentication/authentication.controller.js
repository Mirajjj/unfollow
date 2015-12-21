/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/insta/authentication              ->  index
 */

'use strict';

import  mgdb from './authentication.db';

var ENV = {
  development: {
    CLIENT_ID: '966bb08683964afe8189ec6290b76af9',
    CLIENT_SECRET: '24153fa5690e470a8a321113a0590b2a',
    IP_URL: 'http://192.168.168.118:9000',
    REDIRECT_URL: 'http://192.168.168.118:9000/insta/authentication/callback'
  }
}

var url = require('url');
var https = require('https');
var querystring = require('querystring');


var insta_response = null;
var access_token = null;
var user = null;
var users = {}

// Initial response
exports.index = function(req, res) {
  res.status(200);
}

exports.callback = function(req, res) {
  var url_parts = url.parse(req.url, true),
      self_res = res;
  insta_response = url_parts.query;


  var post_data = querystring.stringify({
    client_id: ENV.development.CLIENT_ID,
    client_secret: ENV.development.CLIENT_SECRET,
    grant_type: "authorization_code",
    redirect_uri: ENV.development.REDIRECT_URL,
    code: insta_response.code
  });

  var options = {
    host: 'api.instagram.com',
    path: '/oauth/access_token',
    method: 'POST',
    data: post_data,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      'content-length': Buffer.byteLength(post_data)
    }
  };

  var post_req = https.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('Response: ' + chunk);
        var chuckData = JSON.parse(chunk);

        access_token = chuckData.access_token;
        user = chuckData.user;
        users[user.id] = user;

        mgdb.saveUser(user.id, access_token, user );

        self_res.redirect('index');
      });
  });

  post_req.write(post_data);
  post_req.end();
}

exports.self = function (req, res) {
  if (user && user.id) { 
    mgdb.getUser(user.id, function (user) {
      res.status(200).json({
        'user': user.data
      });
    })
  } else {
    res.status(200).json({
        'user': null
      });
  }

}

exports.unfollow = function (req, res) {
  var options = {
        host: 'api.instagram.com',
        path: '/v1/users/self/follows?access_token=' + access_token,
        headers: {
          'Content-Type': 'application/json'
        }
      };

  var request = https.get(options, function (res) {
    // Buffer the body entirely for processing as a whole.
  var bodyChunks = [];
    res.on('data', function(chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      console.log(access_token)
      JSON.parse(body).data.forEach(function (user_you_follow) {
        console.log(user_you_follow.id)
      });
    });
  });

  request.on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });
}
