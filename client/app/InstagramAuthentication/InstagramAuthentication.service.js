'use strict';

angular.module('unfollowApp')
  .service('InstagramAuthentication', function ($http) {
    var self = this, 
        dev  = ENV.development;

    this.isAuthenticated  = function () {
      return localStorage.getItem('user') ? true : false;
    };

    this.authenticate = function () {
      if (!self.isAuthenticated()) {
        $http.get('/insta/authentication/self').then(function (response) {
          if (response.data && response.data.user) {
            console.log('1', response.data)
            localStorage.setItem('user', JSON.stringify(response.data));
          } else {
            window.location ='https://api.instagram.com/oauth/authorize/?client_id=' + 
                              dev.CLIENT_ID + '&redirect_uri=' + dev.redirect_uri + 
                              '&response_type=code&scope=likes+relationships+comments';
          }
        });
      }
    };

    this.getUser = function () {
      return JSON.parse(localStorage.getItem('user'));
    }

    this.unfollow = function () {
      if (self.isAuthenticated()) {
        console.log('2', localStorage.getItem('user'));
        
        $http.get('/insta/authentication/unfollow/' + JSON.parse(this.getUser().user).id).then(function (response) {

        });
      }
    };
  });
