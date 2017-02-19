(function() {
    'use strict';

    angular.module('TrouwApp.directives', [])
        .directive('modal', function () {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    ngId: '@',
                    ngTitle: '@'
                },
                template: '<div id="{{ngId}}" class="modal" role="dialog">' +
                            '<div class="modal-dialog">' +
                                '<div class="modal-content">' +
                                    '<div class="modal-header">' +
                                        '<button type="button" class="close" data-dismiss="modal" title="Sluiten">&times;</button>' +
                                        '<h4>{{ngTitle}}</h4>' +
                                    '</div>' +
                                    '<ng-transclude></ng-transclude>' +
                                '</div>' +
                            '</div>' +
                          '</div>'
            };
        })
       .directive('back', ['$window', function ($window) {
           return {
               restrict: 'A',
               link: function (scope, elem, attrs) {
                   elem.bind('click', function () {
                       $window.history.back();
                   });
               }
           };
       }])
       .directive('carousel', function () {
           return {
               restrict: 'E',
               scope: {
                   items: '='
               },
               link: function (scope, elem, attrs) {
                   scope.currentIndex = 0;

                   scope.onPrevious = function () {
                       if (!angular.isArray(scope.items)) return;
                       --scope.currentIndex;
                       if (scope.currentIndex < 0) scope.currentIndex = scope.items.length - 1;
                   };

                   scope.onNext = function () {
                       if (!angular.isArray(scope.items)) return;
                       ++scope.currentIndex;
                       if (scope.currentIndex >= scope.items.length) scope.currentIndex = 0;
                   };
               },
               template: '<div class="carousel slide">' +
                   '<div class="carousel-outer">' +
                     '<div class="carousel-inner">' +
                         '<div class="item" ng-repeat="item in items" ng-class="{active: $index == currentIndex}">' +
                             '<img src="{{item.src}}" alt="{{item.alt}}"/>' +
                         '</div>' +
                         '<a class="left carousel-control" href ng-click="onPrevious();" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a>' +
                         '<a class="right carousel-control" href ng-click="onNext();" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>' +
                     '</div>' +
                   '<ol class="carousel-indicators mCustomScrollbar">' +
                     '<li ng-repeat="item in items" ng-class="{active: $index == currentIndex}" ng-click="$parent.currentIndex = $index;"><img src="{{item.src}}" alt="{{item.alt}}"/></li>' +
                   '</ol>' +
                 '</div>'
           };
       })
       .directive('activityCard', ['DataService', function (dataService) {
           return {
               restrict: 'E',
               scope: {
                   id: '@'
               },
               link: function (scope, element, attrs) {
                   function onIdChange(newVal, oldVal) {
                       scope.item = undefined;
                       if (angular.isUndefined(newVal) || newVal == oldVal) return;
                       dataService.getActivity(scope.id).then(function (activity) { scope.item = activity; });
                   };
                   scope.$watch('id', onIdChange);

                   onIdChange(scope.id, undefined);
               },
               template: '<div class="row activitycard">' +
                         '<div class="pull-right piggybank" ng-if="id.length > 0"><a href="#!/sponsor?activity={{id}}" title="Sponser!"><span class="glyphicon glyphicon-piggy-bank"></span></a></div>' +
                         '<div class="col-xs-4 image" ng-if="item.image.src.length > 0"><img ng-src="{{item.image.src}}" alt="{{item.image.alt}}"/></div>' +
                         '<div class="{{item.image.src.length > 0 ? \'col-xs-8\' : \'col-xs-12\'}}"><h3 ng-bind-html="item.name"></h3><p ng-bind-html="item.description"></p></div>' +
                         '</div>'
           };
       }])
    .directive('giftCard', function () {
        return {
            restrict: 'E',
            scope: {
                message: '=',
                afzender: '=',
                url: '@'
            },
            template: '<div class="giftcard">' +
                            '<div class="row"><div class="col-xs-12">' +
                                    '<h2 class="col-xs-12 no-margin text-center"><span class="glyphicon glyphicon-gift"></span></h2>' +
                            '</div></div>' +
                            '<div class="row"><div class="col-xs-6 col-xs-offset-3">' +
                                    '<qrcode version="{{version}}" error-correction-level="L" data="{{url}}" href="{{url}}" size="850" class="qrcode-wrapper"></qrcode>' +
                            '</div></div>' +
                            '<div class="row"><div class="col-xs-12">' +
                                    '<div class="col-xs-12 center" style="font-size: 1.2em; word-break: break-word">{{message}}</div>' +
                                    '<p class="col-xs-12 center" ng-if="afzender.length > 0">-- <i>{{afzender}}</i></p>' +
                            '</div></div>' +
                        '</div>',
            link: function (scope) {
                scope.$watch('url', function () {
                    var count = scope.url.length*2;
                    var version = 1;
                    if (count > 25)++version;
                    if (count > 47)++version;
                    if (count > 77)++version;
                    if (count > 114)++version;
                    if (count > 154)++version;
                    if (count > 195)++version;
                    if (count > 224)++version;
                    if (count > 279)++version;
                    if (count > 335)++version;
                    if (count > 395)++version;
                    if (count > 468)++version;
                    if (count > 535)++version;
                    if (count > 619)++version;
                    if (count > 667)++version;
                    if (count > 758)++version;
                    if (count > 854)++version;
                    if (count > 938)++version;
                    if (count > 1046)++version;
                    if (count > 1153)++version;
                    if (count > 1249)++version;
                    if (count > 1352)++version;
                    if (count > 1460)++version;
                    if (count > 1588)++version;
                    if (count > 1704)++version;
                    if (count > 1853)++version;
                    if (count > 1990)++version;
                    if (count > 2132)++version;
                    if (count > 2223)++version;
                    if (count > 2369)++version;
                    if (count > 2520)++version;
                    if (count > 2677)++version;
                    if (count > 2840)++version;
                    if (count > 3009)++version;
                    if (count > 3183)++version;
                    if (count > 3351)++version;
                    if (count > 3537)++version;
                    if (count > 3729)++version;
                    if (count > 3927)++version;
                    if (count > 4087)++version;
                    if (count > 4296)++version;
                    scope.version = version;
                });
            }
        };
    })
    ;
})();