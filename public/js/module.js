'use strict';

var app = angular.module('myApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', { url: '/', templateUrl: '/html/home.html' })
    
    .state('login', {
      url: '/login',
      templateUrl: '/html/login.html',
      controller: 'loginCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/html/register.html',
      controller: 'registerCtrl'
    })


  $urlRouterProvider.otherwise('/');
});
