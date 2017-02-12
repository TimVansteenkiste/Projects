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
                sponsor: '#!/sponsor?flight=' + flight.id
            };
        }
        function locationToTimelineItem(location) {
            return {
                badge: { severity: 'info', type: 'map-marker' },
                title: location.title,
                timestamp: location.start + ' - ' + location.end,
                description: location.description,
                link: '#!/location/' + location.id,
                sponsor: '#!/sponsor?location=' + location.id
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
    .controller('LocationController', ['$routeParams', 'DataService', '$location', function ($routeParams, dataService, $location) {
        var ctrl = this;

        ctrl.location = { title: $routeParams['location'] };
        ctrl.carouselItems = [];

        function berekenStats() {
            function dateStat(location) {
                if (angular.isUndefined(location) || angular.isUndefined(location.start) || angular.isUndefined(location.end)) return;
                return location.start + ' - ' + location.end
            }
            function prijsStat(location) {
                if (angular.isUndefined(location)) return;
                var prijs = 0.00;
                if (angular.isDefined(location.hotel))
                    prijs += location.hotel.price * location.hotel.nights;
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
                return '<a href="#!' + $location.path() + '#hotel">' + location.hotel.name + '</a>';
            }
            function driveStat(location) {
                if (angular.isUndefined(location) || angular.isUndefined(location.drive)) return;
                if (location.drive.distance > 0) return location.drive.distance + 'km';
            }
            function activiteitenStat(activities) {
                if (!angular.isArray(activities) || activities.length == 0) return;
                return '<a href="#!' + $location.path() + '#activiteiten">' + activities.length + '</a>';
            }
            function sponsorStat(location) {
                if (angular.isUndefined(location) || angular.isUndefined(location.id)) return;
                return '<a href="#!/sponsor?location=' + location.id + '">Sponser!</a>';
            }
            ctrl.stats = [
                { title: "Verblijf duur", key: '<span class="glyphicon glyphicon-calendar"></span>', value: dateStat(ctrl.location) },
                //{ title: "Prijskaartje", key: '<span class="glyphicon glyphicon-euro"></span>', value: prijsStat(ctrl.location) },
                { title: "Hotel", key: '<span class="fa fa-bed"></span>', value: hotelStat(ctrl.location) },
                { title: "Totale Rij afstand", key: '<span class="fa fa-car" ></span>', value: driveStat(ctrl.location) },
                { title: "Activiteiten", key: '<span class="fa fa-ticket"></span>', value: activiteitenStat(ctrl.activities) },
                { title: "Sponser", key: '<span class="glyphicon glyphicon-piggy-bank"></span>', value: sponsorStat(ctrl.location) }
            ];
        }

        dataService.getLocation($routeParams['location'])
                   .then(function (location) {
                       ctrl.location = location;
                       ctrl.activities = [];
                       ctrl.carouselItems = [];
                       return location.id;
                   })
                   .then(function (locationId) {
                       return dataService.getActivities(locationId);
                   })
                   .then(function (activities) {
                       ctrl.activities = activities;
                       berekenStats();
                   });
        

        return ctrl;
    }])
    .controller('SponsorController', ['$routeParams', '$location', 'DataService', function ($routeParams, $location, dataService) {
        var ctrl = this;
        ctrl.index = 0;
        ctrl.location = ctrl.activity = undefined;

        if (angular.isString($routeParams['location']))
            dataService.getLocation($routeParams['location'])
                       .then(function (location) {
                           ctrl.location = location;
                       });
        else if (angular.isString($routeParams['activity']))
            dataService.getActivity($routeParams['activity'])
                       .then(function (activity) {
                           ctrl.activity = activity;
                       });
        else if (angular.isString($routeParams['flight']))
            dataService.getFlight($routeParams['flight'])
                       .then(function (flight) {
                           ctrl.flight = flight;
                       });

        ctrl.printDiv = function (divName) {
            var div = document.getElementById(divName);
            html2canvas([div], {
                onrendered: function (canvas) {
                    var scale = 4;
                    var extra_canvas = document.createElement('canvas');
                    extra_canvas.setAttribute('width', canvas.width * scale);
                    extra_canvas.setAttribute('height', canvas.height * scale);
                    var ctx = extra_canvas.getContext('2d');
                    ctx.webkitImageSmoothingEnabled = false;
                    ctx.mozImageSmoothingEnabled = false;
                    ctx.imageSmoothingEnabled = false;
                    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width * scale, canvas.height * scale);
                    //var context = canvas.getContext('2d');
                    var src = extra_canvas.toDataURL('image/png');
                    var content = '<html><head><link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css" /></head><body onload="window.print(); window.close();" class="container"><div class="row"><image class="col-xs-12" src="' + src + '" /></div></body></html>';
                    
                    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
                        var popupWin = window.open('', '_blank', 'width=2480,height=3508,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
                        popupWin.window.focus();
                        popupWin.document.write('<!DOCTYPE html>' + content);
                        popupWin.onbeforeunload = function (event) {
                            popupWin.close();
                            return '.\n';
                        };
                        popupWin.onabort = function (event) {
                            popupWin.document.close();
                            popupWin.close();
                        }
                        popupWin.document.close();
                    }
                    else {
                        var popupWin = window.open('', '_blank', 'width=2480,height=3508');
                        popupWin.document.open();
                        popupWin.document.write(content);
                        popupWin.document.close();
                    }
                }
            });
        }
        
        ctrl.UpdateUrl = function () {
            ctrl.url = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/app' + '/#!gift';
            var items = [];
            if (angular.isString($routeParams['location']))
                items.push('location=' + $routeParams['location']);
            if (angular.isString($routeParams['activity']))
                items.push('activity=' + $routeParams['activity']);
            if (angular.isString($routeParams['flight']))
                items.push('flight=' + $routeParams['flight']);
            if (angular.isString(ctrl.afzender))
                items.push('a=' + ctrl.afzender);
            if (angular.isString(ctrl.message))
                items.push('m=' + ctrl.message);

            if (items.length > 0)
                ctrl.url += '?' + items.join('&');

            ctrl.url = encodeURI(ctrl.url);
        }
        ctrl.UpdateUrl();

        ctrl.volgende = function () { ctrl.index += 1; if (ctrl.index >= 3) ctrl.index = 2; }
        ctrl.vorige = function () { ctrl.index -= 1; if (ctrl.index < 0) ctrl.index = 0;}

        return ctrl;
    }])
    .controller('GiftController', ['$routeParams', '$location', 'DataService', function ($routeParams, $location, dataService) {
        var ctrl = this;

        function getDecoded(parameter) {
            return $routeParams[parameter];
        }

        ctrl.message = getDecoded('m');
        ctrl.afzender = getDecoded('a');

        ctrl.url = $location.absUrl();

        return ctrl;
    }])
    ;
})();