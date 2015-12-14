'use strict';

(function() {
  function MainController($scope, $http, InstagramAuthentication) {
    var self = this;
    this.awesomeThings = [];

    $http.get('/api/things').then(function(response) {
      self.awesomeThings = response.data;
    });

    this.addThing = function() {
      if (self.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: self.newThing });
      self.newThing = '';
    };

    this.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.actions = {
      unfollow: function () {
        InstagramAuthentication.authenticate();
      }
    };
  }

  angular.module('unfollowApp')
    .controller('MainController', MainController);

})();
