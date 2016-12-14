(function() {
'use strict';

    // Glyphicons:
    //home
    //road
    //camera
    //map-marker
    //eye-open
    //shopping-cart
    //plane / send
    //tower
    //tree-conifer
    //tree-deciduous
    //piggy-bank
angular.module('TrouwApp.controllers', [])
    .controller('TimelineController', ['$q', 'DataService', function ($q, dataService) {
        var ctrl = this;

        ctrl.timelineItems = [];

        function flightToTimelineItem(flight) {
            return {
                badge: { severity: 'info', type: 'send' },
                title: flight.title,
                timestamp: flight.start + ' - ' + flight.end,
                description: flight.description,
                link: '#/flight/' + flight.id
            };
        }
        function locationToTimelineItem(location) {
            return {
                badge: { severity: 'info', type: 'map-marker' },
                title: location.title,
                timestamp: location.start + ' - ' + location.end,
                description: location.description,
                link: '#/location/' + location.id
            };
        }
        function timelineSort(item1, item2) {
            var dag1 = item1.timestamp.substring(0, 2), dag2 = item2.timestamp.substring(0, 2);    
            return parseInt(dag1) - parseInt(dag2);
        }

        $q.all({ flights: dataService.getFlights(), locations: dataService.getLocations() })
          .then(function (data) {
              ctrl.timelineItems = [];
              ctrl.timelineItems.push.apply(ctrl.timelineItems, data.flights.map(flightToTimelineItem));
              ctrl.timelineItems.push.apply(ctrl.timelineItems, data.locations.map(locationToTimelineItem));
              ctrl.timelineItems.sort(timelineSort);
          });

        return ctrl;
    }])
    .controller('LocationController', ['$routeParams', 'DataService', function ($routeParams, dataService) {
        var ctrl = this;

        ctrl.location = { title: $routeParams['location'] };
        ctrl.carouselItems = [
            { src: "http://placehold.it/1000x500&text=slide1" },
            { src: "http://placehold.it/1000x500&text=slide2" },
            { src: "http://placehold.it/1000x500&text=slide3" }
        ];

        function berekenStats() {
            function dateStat(location) {
                if (angular.isUndefined(location) || angular.isUndefined(location.start) || angular.isUndefined(location.end)) return;
                return location.start + ' - ' + location.end
            }
            function prijsStat(location) {
                if (angular.isUndefined(location)) return;
                var prijs = 0.00;
                if (angular.isDefined(location.hotel))
                    prijs += location.hotel.price;
                if (angular.isArray(location.activities)) {
                    for (var i = 0, activity; activity = location.activities[i]; ++i) {
                        prijs += activity.price;
                    }
                }

                if (prijs <= 0) return;
                else return prijs.toFixed(2) + '&euro;';
            }
            function hotelStat(location) {
                if (angular.isUndefined(location) || angular.isUndefined(location.hotel)) return;
                return '<a href="#/location/' + location.id + '/hotel">' + location.hotel.name + '</a>';
            }
            function activiteitenStat(location) {
                if (angular.isUndefined(location) || !angular.isArray(location.activities)) return;
                return location.activities.length;
            }
            function sponserStat(location) {
                if (angular.isUndefined(location) || angular.isUndefined(location.id)) return;
                return '<a href="#/sponser?location=' + location.id + '">Sponser!</a>';
            }
            ctrl.stats = [
                { title: "Verblijf duur", key: '<span class="glyphicon glyphicon-calendar"></span>', value: dateStat(ctrl.location) },
                { title: "Prijskaartje", key: '<span class="glyphicon glyphicon-euro"></span>', value: prijsStat(ctrl.location) },
                { title: "Hotel", key: '<span class="glyphicon glyphicon-home"></span>', value: hotelStat(ctrl.location) },
                { title: "Totale Rij afstand", key: '<span class="glyphicon glyphicon-road" ></span>', value: ctrl.location.driveDistance },
                { title: "Activiteiten", key: '<span class="glyphicon glyphicon-camera"></span>', value: activiteitenStat(ctrl.location) },
                { title: "Sponser", key: '<span class="glyphicon glyphicon-piggy-bank"></span>', value: sponserStat(ctrl.location) }
            ];
        }

        dataService.getLocation($routeParams['location'])
                   .then(function (location) {
                       ctrl.location = location;
                       berekenStats();
                       ctrl.carouselItems = [];
                   });
        

        return ctrl;
    }])
    .controller('FlightController', ['$routeParams', 'DataService', function ($routeParams, dataService) {
        var ctrl = this;

        ctrl.flight = { title: $routeParams['flight'] };

        dataService.getFlight($routeParams['flight'])
                   .then(function (flight) {
                       ctrl.flight = flight;
                   });

        return ctrl;
    }])
    ;
})();