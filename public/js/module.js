'use strict';

var app = angular.module('myApp', ['ui.router', 'ngCookies']);

app.constant('TOKENNAME', 'authtoken');

app.run(function(User) {
  User.readToken();
});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', { url: '/', templateUrl: '/html/home.html' })
    
    .state('login', {
      url: '/login',
      templateUrl: '/html/loginregister.html',
      controller: 'loginRegisterCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/html/loginregister.html',
      controller: 'loginRegisterCtrl'
    })

    .state('profile', {
      url: '/profile',
      templateUrl: '/html/profile.html',
      controller: 'profileCtrl',
      resolve: {
        CurrentUser: function(User) {
          return User.getProfile();
        }
      }
    })

    // .state('clog', {
    //   url: '/clog/:clogId',
    //   templateUrl: '/html/clog.html',
    //   controller: 'profileCtrl',
    //   resolve: {
    //     ThisClog: function($stateParams, Clog) {
    //       return Clog.findById($stateParams.clogId);
    //     }
    //   }
    // })

  $urlRouterProvider.otherwise('/');
});
