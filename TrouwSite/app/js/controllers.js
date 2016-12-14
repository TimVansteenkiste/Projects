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

        ctrl.title = $routeParams['location'];
        ctrl.carouselItems = [
            { src: "http://placehold.it/1000x500&text=slide1" },
            { src: "http://placehold.it/1000x500&text=slide2" },
            { src: "http://placehold.it/1000x500&text=slide3" }
        ];

        dataService.getLocation($routeParams['location'])
                   .then(function (location) {
                       ctrl.title = location.title;
                       ctrl.carouselItems = [];
                   });
        

        return ctrl;
    }])
    .controller('FlightController', ['$routeParams', 'DataService', function ($routeParams, dataService) {
        var ctrl = this;

        ctrl.title = $routeParams['flight'];

        dataService.getFlight($routeParams['flight'])
                   .then(function (flight) {
                       ctrl.title = flight.title;
                   });

        return ctrl;
    }])
    ;
})();