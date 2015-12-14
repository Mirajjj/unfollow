/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/insta/authentication              ->  index
 */

'use strict';

var url = require('url');
var https = require('https');
var querystring = require('querystring');

var InstaClient = {
  CLIENT_ID: '966bb08683964afe8189ec6290b76af9',
  CLIENT_SECRET: '24153fa5690e470a8a321113a0590b2a'
};

var ip_url = 'http://192.168.168.118:9000';

var instaAPI = require('instagram-node').instagram();

instaAPI.use({
  client_id: InstaClient.CLIENT_ID,
  client_secret: InstaClient.CLIENT_SECRET
});

var redirect_uri = ip_url + '/insta/authentication/callback';

var insta_response = null;

var access_token = [];

// Initial response
exports.index = function(req, res) {
  res.status(200);
}

exports.callback = function(req, res) {
  var url_parts = url.parse(req.url, true),
      self_res = res;
  insta_response = url_parts.query;


  var post_data = querystring.stringify({
    client_id: InstaClient.CLIENT_ID,
    client_secret: InstaClient.CLIENT_SECRET,
    grant_type: "authorization_code",
    redirect_uri: redirect_uri,
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
        access_token.push(chunk);

        self_res.redirect('index');
      });
  });

  console.log(post_data)
  post_req.write(post_data);
  post_req.end();
}

exports.getAccessToken = function (req, res) {
  res.status(200).json({
    'access_token': access_token
  });
}
