'use strict';

angular.module('unfollowApp')
  .service('InstagramAuthentication', function ($http) {
    var self = this, 
        dev  = ENV.development;

    this.isAuthenticated  = function () {
      return localStorage.getItem('user_id') ? true : false;
    };

    this.authenticate = function () {
      if (self.isAuthenticated()) {
        console.log(localStorage.getItem('user_id'))
      } else {
        $http.get('/insta/authentication/self').then(function (response) {
          if (response.data && response.data.user) {
            console.log(response.data.user.id)
            localStorage.setItem('user_id', response.data.user.id);
          } else {
            window.location ='https://api.instagram.com/oauth/authorize/?client_id=' + 
                              dev.CLIENT_ID + '&redirect_uri=' + dev.redirect_uri + 
                              '&response_type=code&scope=likes+relationships+comments';
          }
        })
        
      }
    };
  });
