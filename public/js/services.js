'use strict';

var app = angular.module('myApp');


app.service('User', function($http, $rootScope, $cookies, $state, TOKENNAME) {

  this.readToken = () => {
    let token = $cookies.get(TOKENNAME);

    if(typeof token === 'string') {
      let payload = JSON.parse(atob(token.split('.')[1]));
      $rootScope.currentUser = payload;
    }
  };

  this.register = userObj => {
    return $http.post('/api/users/register', userObj);
  };

  this.login = userObj => {
    return $http.post('/api/users/login', userObj);
  };

  this.logout = () => {
    $cookies.remove(TOKENNAME);
    $rootScope.currentUser = null;
    $state.go('home');

    // 1. get rid of cookie
    // 2. clear user from rootScope
    // 3. (optional) send user to home state
  };

});

