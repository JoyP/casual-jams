(function(){
  'use strict';

  angular.module('casual-jams', ['ngRoute', 'LocalForageModule'])
  .config(['$routeProvider', '$httpProvider', '$localForageProvider', function($routeProvider, $httpProvider, $localForageProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/register', {templateUrl:'/views/register/register.html', controller:'RegisterCtrl'})
    .when('/login',    {templateUrl:'/views/login/login.html',       controller:'LoginCtrl'})
    .when('/logout',   {templateUrl:'/views/logout/logout.html',     controller:'LogoutCtrl'})
    .when('/profile',  {templateUrl:'/views/profile/profile.html',   controller:'ProfileCtrl'})
    .when('/jam-sessions',  {templateUrl:'/views/jamSessions/jamSessions.html',   controller:'JamSessionsCtrl'})
    .otherwise({redirectTo:'/'});

    $httpProvider.interceptors.push('HttpInterceptor');
    $localForageProvider.config({name:'casual-jams', storeName:'cache', version:1.0});
  }]);
})();

