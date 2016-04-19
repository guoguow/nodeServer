
var services = angular.module('my.services', []);

// share user information across controllers
services.factory('user', function($http, $cookies, $q){

  return {


      get: function($scope) {
          var deferred = $q.defer();

          $http.post('/getuser',{id:$scope.id_user}).success(function(data) {

              deferred.resolve(data);
          }).error(function(data) {
              deferred.reject(data.error);

          });
          return deferred.promise;

      },
      getSign: function($scope) {
          var deferred = $q.defer();
          $http.post('/getsign',{id:$scope.id_sign}).success(function(data) {
              deferred.resolve(data);
          }).error(function(data) {
              deferred.reject(data.error);

          });
          return deferred.promise;

      },
      getst1: function ($scope) {
          $http.post('/getst1',{id:$scope.id_st1}).success(function(data) {
              console.log("__________________________"+data);
              $scope.st1=data;
          }).error(function(error) {
          });
      },

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
      logout: function ($scope) {
          var deferred = $q.defer();
          $http.get('/signout',{username:$scope.user.username})
              .success(function () {
                  delete $cookies.user;
                  deferred.resolve();
              }).error(function (data) {
                  deferred.reject(data.error);
              });
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
              $cookies.user = angular.toJson(data);

              deferred.resolve(data);

          }).error(function (data) {
              deferred.reject(data.error);
          });
          return deferred.promise;
      },
      getprofile: function ($scope) {

          console.log('before get');

          $http.get('/profile', {params: {username: $scope.user.username, ssn: $scope.user.ssn
          }}).success(function (data) {
              console.log('return get data');
              console.log(data);
              console.log('in get profile before return ');
              console.log(data);
              $scope.ssn = data.ssn;
              $scope.name = data.name;
              $scope.mobilephone = data.mobilephone;
              $scope.idcard = data.idcard;
              $scope.address = data.address;
              $scope.sex = data.sex;
              $scope.birthday=data.birthday;
              $scope.PS=data.PS;
              $scope.nationality=data.nationality;
              $scope.marrige=data.marrige;
          }).error(function (data) {
          });

      },
      checkprofile: function (user, ssn, name, idcard) {
          var deferred = $q.defer();
          console.log('before check');

          $http.get('/checkprofile',  {params: {username: user.username, ssn: ssn, name: name, idcard: idcard
          } }).success(function (data) {
              console.log('check  _____ return get data');
              console.log(data);
              console.log('in get profile before return ');
              deferred.resolve(data);
          }).error(function (data) {
              deferred.reject(data.error);
          });
          return deferred.promise;
      }
  };
    });










