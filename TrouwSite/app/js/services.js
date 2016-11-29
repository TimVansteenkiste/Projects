(function() {
    'use strict';

    angular.module('TrouwApp.services', [])
        .factory('dataService', function ($http) {
            var _promise = undefined;

            function _getAll() {
                if (_promise !== undefined) {
                    return _promise;
                }

                return $http.get('content/json/data.json').then(function (response) {
                    return response.data;
                }, function () { _promise = undefined; });
            };

            _getAll();

            function _getFlight(identifier) {

            };

            return {
                getTimeline: _getTimeline,
                getFlight: _getFlight
            };
        })
    ;
})();