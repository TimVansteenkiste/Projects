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
    ;
})();