'use strict';

angular.module('TrouwApp', [
  'ngRoute',
  'ngSanitize',
  'toaster',
  'monospaced.qrcode',
  'TrouwApp.services',
  'TrouwApp.controllers',
  'TrouwApp.directives'
]).
config(['$httpProvider', '$locationProvider', '$routeProvider', function ($httpProvider, $locationProvider, $routeProvider) {
    
    // Disable Caching
    if (!$httpProvider.defaults.headers.get) $httpProvider.defaults.headers.get = {};
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

    $routeProvider
            .when('/gift', {
                templateUrl: 'pages/gift.html',
                controller: 'GiftController',
                controllerAs: 'ctrl',
                caseInsensitiveMatch: true
            })
            .when('/sponsor', {
                templateUrl: 'pages/sponsor.html',
                controller: 'SponsorController',
                controllerAs: 'ctrl',
                caseInsensitiveMatch: true
            })
            .when('/flight/:flight', {
                templateUrl: 'pages/flight.html ',
                controller: 'FlightController',
                controllerAs: 'ctrl',
                caseInsensitiveMatch: true
            })
            .when('/location/:location', {
                templateUrl: 'pages/location.html ',
                controller: 'LocationController',
                controllerAs: 'ctrl',
                caseInsensitiveMatch: true
            })
			.when('/home', { templateUrl: 'pages/home.html' })
			.otherwise({ redirectTo: '/home' });


    $locationProvider.hashPrefix('!');
}]);
