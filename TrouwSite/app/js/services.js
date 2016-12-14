(function() {
    'use strict';

    angular.module('TrouwApp.services', [])
        .factory('DataService', function ($http) {
            var _promise = undefined;

            _getAll();
            function _getAll() {
                if (_promise !== undefined) {
                    return _promise;
                }

                _promise = $http.get('content/json/data.json').then(function (response) {
                    return response.data;
                }, function () { _promise = undefined; });
            };


            function _getFlights() {
                return _getAll().then(function (data) { return data.flights; });
            }
            function _getFlight(id) {
                return _getFlights()
                    .then(function (flights) { return flights.find(function (flight) { return flight.id == id; }); });
            }

            function _getLocations() {
                return _getAll().then(function (data) { return data.locations; });
            }
            function _getLocation(id) {
                return _getLocations()
                    .then(function (locations) { return locations.find(function (location) { return location.id == id; }); });
            }

            return {
                getFlights: _getFlights,
                getFlight: _getFlight,

                getLocations: _getLocations,
                getLocation: _getLocation
            };
        })
    ;
})();