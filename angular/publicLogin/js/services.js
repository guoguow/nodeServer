
var services = angular.module('myLogin.services', []);

// share user information across controllers
services.factory('user', function($http, $cookies, $q){

  return {
      login: function (username, password) {
          var deferred = $q.defer();
          $http.get('/signin', {params: {username: username, password: password
          }}).success(function (data) {
              // now get some information about the user
              $cookies.user = angular.toJson(data);
              console.log('cookies user ');
              deferred.resolve(data);
          }).error(function (data) {
              deferred.reject(data.error);
          });
          console.log('login');
          return deferred.promise;
      },
      signup: function (firstname, lastname, username, email, password) {
          var deferred = $q.defer();
          $http.post('/signup', {
              firstName: firstname,
              lastName: lastname,
              email: email,
              username: username,
              password: password
          }).success(function (data) {
              // now get some information about the user*
              console.log('signup success');

              deferred.resolve(data);

          }).error(function (data) {
              deferred.reject(data.error);
          });
          return deferred.promise;
      }

  };
    });










