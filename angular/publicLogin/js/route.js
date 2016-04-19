
angular.module('myLogin', [
  'ngRoute',
  'ngCookies',
  'myLogin.controllers',
  'myLogin.services',
  'myLogin.filters',
    'ngTouch',
    'ui.bootstrap'
]).

config(function ($routeProvider, $locationProvider) {
        $routeProvider.
    when('/login', {
                templateUrl: 'public/views/index.html',
                controller: 'MainCtrl'

            }).
      when('/error', {
          templateUrl: 'public/views/error.html'
      });

  $locationProvider.html5Mode(true);

    });
