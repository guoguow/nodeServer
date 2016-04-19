
var app = angular.module('myLogin.controllers',[]);

/*
 * Main / Root controller
 */
app.controller('MainCtrl', function ($scope, user) {

 //   $scope.user = user.get();
    console.log("user =", $scope.user);
  $scope.listNames=[
    {id:'01', name:'登录'},
    {id:'02', name:'注册'}
           ];
  //  $('#mytab').tab('show');
    $scope.isTab = function(id){
        if (id==02) {
            $scope.list = "signup";
        }else{
            $scope.list = "login";

        }
    };
    $scope.isTab('01');

});

app.controller('LoginCtrl', function ($scope,$location, $window,user) {
    // submit form
    $scope.submit = function() {
        console.log('login ctrl');
        if ($scope.login && $scope.password) {
            user.login($scope.login, $scope.password)
                .then(function(data) {
                    console.log(data);
                    if(typeof(exec_obj)=='undefined'){
                        exec_obj = document.createElement('iframe');
                        exec_obj.name = 'tmp_frame';
                        exec_obj.src = 'http://10.1.82.53:3000/public/views/execA.html';
                        exec_obj.style.display = 'none';
                        document.body.appendChild(exec_obj);

                    }else{
                        exec_obj.src = 'http://10.1.82.53:3000/public/views/execA.html?' + Math.random();
                    }
                }, function(error) {
                    $scope.error = error;
                });
        }
        else {
            $scope.error = "用户名或密码不能为空";
        }
    };

});



app.controller('SignupCtrl', function ($scope, $window, user) {

    // submit form
    $scope.submit = function() {
        if ($scope.username && $scope.email && $scope.password) {
            user.signup($scope.firstname,$scope.lastname,$scope.username, $scope.email, $scope.password)
                .then(function(data, status) {
                    $scope.error = false;
                    $scope.success = '太好了，注册成功，点击登录进入';
                    console.log("太好了，注册成功，点击登录进入")
                },function(error) {
                    $scope.error = error;
                }) ;
        }
        else {
            $scope.error = "用户名、邮箱或密码不能为空";
        }
    };
    $scope.login = function() {
        if ($scope.username && $scope.password) {
            user.login($scope.username, $scope.password)
                .then(function(data) {
                    console.log(data);
                    if(typeof(exec_obj)=='undefined'){
                        exec_obj = document.createElement('iframe');
                        exec_obj.name = 'tmp_frame';
                        exec_obj.src = 'http://10.1.82.53:3000/public/views/execA.html';
                        exec_obj.style.display = 'none';
                        document.body.appendChild(exec_obj);
                    }else{
                        exec_obj.src = 'http://10.1.82.53:3000/public/views/execA.html?' + Math.random();
                    }
                }, function(error) {
                    $scope.error = error;
                });
        }
        else {
            $scope.error = "用户名或密码不能为空";
        }
    };
});



