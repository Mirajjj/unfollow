'use strict';

angular.module('unfollowApp')
  .service('InstagramAuthentication', function ($http) {
    var self = this, 
        dev  = ENV.development;

    this.isAuthenticated  = function () {
      return localStorage.getItem('authentication') ? true : false;
    };

    this.authenticate = function () {
      if (self.isAuthenticated()) {
        
      } else {
        $http.get('/insta/authentication/access_token').then(function (response) {
          if (response.data && response.data.access_token.length > 0) {
            console.log(response)
          } else {
            window.location ='https://api.instagram.com/oauth/authorize/?client_id=' + 
                              dev.CLIENT_ID + '&redirect_uri=' + dev.redirect_uri + 
                              '&response_type=code&scope=likes+relationships+comments';
          }
        })
        
      }
    
    };
  });
