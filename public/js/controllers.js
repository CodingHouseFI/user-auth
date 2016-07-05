'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, User) {
  console.log('mainCtrl!');

  $scope.logout = () => {
    User.logout();
  };
});

app.controller('loginCtrl', function($scope, User) {
  console.log('loginCtrl!');

  $scope.login = () => {

    User.login($scope.user)
      .then(res => {
        console.log('res:', res);
      })
      .catch(err => {
        console.log('err:', err);
      });
  };

});

app.controller('registerCtrl', function() {
  console.log('registerCtrl!');
});
