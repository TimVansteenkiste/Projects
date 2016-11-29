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
            .when('/flight/:flight', { templateUrl: 'pages/flight.html ', caseInsensitiveMatch: true })
            .when('/location/:location', {
                templateUrl: 'pages/location.html ',
                controller: 'LocationController',
                controllerAs: 'ctrl',
                caseInsensitiveMatch: true
            })
			.when('/', { templateUrl: 'pages/home.html' })
			.otherwise({ redirectTo: '/' });

}]);
