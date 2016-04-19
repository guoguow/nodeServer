
angular.module('my', [
  'ngRoute',
  'ngCookies',
  'my.controllers',
  'my.services',
  'my.filters',
    'ngTouch',
    'ui.bootstrap',
    'chieffancypants.loadingBar'
]).

config(function ($routeProvider,$compileProvider, $locationProvider,cfpLoadingBarProvider) {
        $routeProvider.
    when('/', {
      templateUrl: 'public/views/index.html'
            }).
            when('/error', {
          templateUrl: 'public/views/error.html'
      }).
            when('/logout', {
                templateUrl: 'public/views/index.html',
                controller: 'LogoutCtrl'
            }).
            when('/profile', {
                templateUrl: 'public/views/profile.html',
                controller: 'ProfileCtrl'
            }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
  cfpLoadingBarProvider.includeSpinner = true;
   $compileProvider.directive('compile', function ($compile) {
            // directive factory creates a link function
            return function (scope, element, attrs) {
                scope.$watch(
                    function (scope) {
                        // watch the 'compile' expression for changes
                        return scope.$eval(attrs.compile);
                    },
                    function (value) {
                        // when the 'compile' expression changes
                        // assign it into the current DOM
                        element.html(value);
                        // compile the new DOM and link it to the current
                        // scope.
                        // NOTE: we only compile .childNodes so that
                        // we don't get into infinite loop compiling ourselves
                        $compile(element.contents())(scope);
                    }
                );
            };
        });
    });
