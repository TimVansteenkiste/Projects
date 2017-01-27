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
                titel: '=',
                message: '=',
                afzender: '=',
                url: '@'
            },
            template: '<div class="giftcard">' +
                            '<div class="row">' +
                                '<div class="col-sm-8 col-xs-9" style="padding: 15px !important;">' +
                                    '<h2 class="col-xs-12 no-margin text-center">{{titel ? titel : \'Geschenk Kaart\'}}</h2>' +
                                        '<div class="col-xs-12" style="font-size: 1.2em">{{message}}</div>' +
                                        '<p class="col-xs-12" ng-if="afzender.length > 0">-- <i>{{afzender}}</i></p>' +
                                '</div>' +
                                '<div class="col-sm-4 col-xs-3">' +
                                    '<qrcode data="{{url}}" href="{{url}}" size="300" class="qrcode-wrapper"></qrcode>' +
                                '</div>' +
                            '</div>' +
                        '</div>'
        };
    })
    ;
})();