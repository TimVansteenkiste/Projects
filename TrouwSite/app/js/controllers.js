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
    .controller('TimelineController', function () {
        var ctrl = this;
        ctrl.timelineItems = [
            {
                badge: { severity: 'info', type: 'send' },
                title: 'Brussels (BRU) - Calgary, Alberta (YYC)',
                timestamp: '11/07, 10u35 - 11/07, 13u40',
                description: '<img class="col-lg-2 col-md-3 col-sm-4 col-xs-12" alt="KLM Royal Dutch Airlines" src="./content/KLM_Logo.png"/><p class="col-lg-10 col-md-9 col-sm-8 col-xs-12">Na een korte tussenstop in Amsterdam, brengt KLM Royal Dutch Airlines ons tot op onze bestemming: Calgary, Alberta.</p>',
                link: '#/flight/to'
            },
            {
                badge: { severity: 'info', type: 'map-marker' },
                title: 'Calgary',
                timestamp: '11/07 - 12/07',
                description: '',
                link: '#/location/Calgary'
            },
            {
                badge: { severity: 'info', type: 'map-marker' },
                title: 'Kanaskis Village',
                timestamp: '12/07 - 14/07',
                description: '',
                link: '#/location/Kanaskis'
            },
            {
                badge: { severity: 'info', type: 'map-marker' },
                title: 'Banff',
                timestamp: '14/07 - 16/07',
                description: '',
                link: '#/location/Banff'
            },
            {
                badge: { severity: 'info', type: 'map-marker' },
                title: 'Lake Louise',
                timestamp: '16/07 - 17/07',
                description: '',
                link: '#/location/LakeLouise'
            },
            {
                badge: { severity: 'info', type: 'map-marker' },
                title: 'Jasper',
                timestamp: '17/07 - 19/07',
                description: '',
                link: '#/location/Jasper'
            },
            {
                badge: { severity: 'info', type: 'map-marker' },
                title: 'Clearwater',
                timestamp: '19/07 - 21/07',
                description: '',
                link: '#/location/Clearwater'
            },
            {
                badge: { severity: 'info', type: 'map-marker' },
                title: 'Kamloops',
                timestamp: '21/07 - 22/07',
                description: '',
                link: '#/location/Kamloops'
            },
            {
                badge: { severity: 'info', type: 'map-marker' },
                title: 'Harrison Hot Springs',
                timestamp: '2/07 - 24/07',
                description: '',
                link: '#/location/Harrison'
            },
            {
                badge: { severity: 'info', type: 'map-marker' },
                title: 'Victoria',
                timestamp: '24/07 - 25/07',
                description: '',
                link: '#/location/Victoria'
            },
            {
                badge: { severity: 'info', type: 'map-marker' },
                title: 'Tofino',
                timestamp: '25/07 - 28/07',
                description: '',
                link: '#/location/Tofino'
            },
            {
                badge: { severity: 'info', type: 'map-marker' },
                title: 'Vancouver',
                timestamp: '28/07 - 30/07',
                description: '',
                link: '#/location/Vancouver'
            },
            {
                badge: { severity: 'info', type: 'send' },
                title: 'Vancouver, Brit. Columbia (YVR) - Brussels(ZYR)',
                timestamp: '30/07, 13u30 - 31/07, 11u51',
                description: '<img class="col-md-4" alt="Air France" src="./content/AirFrance_Logo.png"/><p class="col-md-8">Aan alles komt een einde, zo ook aan dit avontuur.</p>',
                link: '#/flight/back'
            }
        ];
        return ctrl;
    })
    .controller('LocationController', ['$routeParams', function ($routeParams) {
        var ctrl = this;

        ctrl.title = $routeParams['location'];

        ctrl.carouselItems = [
            {src:"http://placehold.it/1000x500&text=slide1"},
            {src:"http://placehold.it/1000x500&text=slide2"}, 
            {src:"http://placehold.it/1000x500&text=slide3"}
        ];

        return ctrl;
    }])
    ;
})();