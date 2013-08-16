angular.module('ui.bootstrap.rating', [])

.constant('ratingConfig', {
  max: 5,
  iconFull: 'icon-star',
  iconEmpty: 'icon-star-empty'
})

.directive('rating', ['ratingConfig', '$parse', function(ratingConfig, $parse) {
  return {
    restrict: 'EA',
    scope: {
      value: '=',
      onHover: '&',
      onLeave: '&'
    },
    template: '<span ng-mouseleave="reset()">' +
              '<i ng-repeat="number in range" ng-mouseenter="enter(number)" ng-click="rate(number)" ng-class="{\'{{iconFull}}\': number <= val, \'{{iconEmpty}}\': number > val}"></i>' +
              '</span>',
    replace: true,
    link: function(scope, element, attrs) {

      var maxRange = angular.isDefined(attrs.max) ? scope.$parent.$eval(attrs.max) : ratingConfig.max;

      scope.iconFull =  angular.isDefined(attrs.iconFull) ? attrs.iconFull : ratingConfig.iconFull;
      scope.iconEmpty =  angular.isDefined(attrs.iconEmpty) ? attrs.iconEmpty : ratingConfig.iconEmpty;

      scope.range = [];
      for (var i = 1; i <= maxRange; i++) {
          scope.range.push(i);
      }

      scope.rate = function(value) {
          if ( ! scope.readonly ) {
              scope.value = value;
          }
      };

      scope.enter = function(value) {
          if ( ! scope.readonly ) {
              scope.val = value;
          }
          scope.onHover({value: value});
      };

      scope.reset = function() {
          scope.val = angular.copy(scope.value);
          scope.onLeave();
      };
      scope.reset();

      scope.$watch('value', function(value) {
          scope.val = value;
      });

      scope.readonly = false;
      if (attrs.readonly) {
          scope.$parent.$watch($parse(attrs.readonly), function(value) {
              scope.readonly = !!value;
          });
      }
    }
  };
}]);
