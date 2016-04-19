
var app = angular.module('my.controllers',[]);

/*
 * Main / Root controller
 */
app.controller('MainCtrl', function ($scope, $cookies,user,$window,cfpLoadingBar,$timeout) {



     $scope.sign=null;


 $scope.home=function(){
    $window.location = '/';

 };

  $scope.get = function () {
        var nodeIp ="10.1.82.53";
        var htmldata = '<iframe  height="1500" class="container col-sm-12 " style="border:0px " src="http://' + nodeIp + ':3002/index"></iframe>';
        // $scope.html='<iframe height="750" class="container col-sm-12 " src="http://211.87.239.152:4194/containers/"></iframe>';
        $scope.html = htmldata;
        $scope.visible = !$scope.visible;
    };
    if($cookies.user){
        $scope.user=angular.fromJson($cookies.user);
        console.log($cookies.user);
        $scope.id_user="user:"+$scope.user.username;
        $scope.id_sign="sign:"+$scope.user.username;
        $scope.id_st1="st1:"+$scope.user.username;
        user.get($scope).then(function(data){
            $scope.user=data;
            if($scope.user){
                $scope.get();
                user.getst1($scope);
            }
        },function(error){});
    }

    $scope.start = function() {
        cfpLoadingBar.start();
    };

    $scope.complete = function () {
        cfpLoadingBar.complete();
    }


    // fake the initial load so first time users can see it right away:
    $scope.start();
    $scope.fakeIntro = true;
    $timeout(function() {
        $scope.complete();
        $scope.fakeIntro = false;
    }, 750);

    $scope.login = function () {
        $scope.sign="login";
        var nodeIp ="10.1.82.53";
        var htmldata = '<iframe  name="myframe" height="1500" class="container col-sm-12 " style="border:0px " src="http://' + nodeIp + ':3001/login"></iframe>';
        // $scope.html='<iframe height="750" class="container col-sm-12 " src="http://211.87.239.152:4194/containers/"></iframe>';
        $scope.html_sign = htmldata;

        $scope.visible_sign = !$scope.visible_sign;
    };

});







app.controller('LogoutCtrl', function ($scope, $window, user) {

    user.logout($scope).then(function() {
        $scope.user = null;
        $window.location = '/';
    }, function(error) {
        console.log(error);
    });


});



app.controller('ProfileCtrl', function ($scope, $window,user) {

    user.get($scope).then(function(data){
        $scope.user=data;
        console.log("user =", $scope.user);

    },function(error){});

    console.log('before get profile');
    user.getprofile($scope);


    $scope.check=function() {
        if ($scope.ssn && $scope.name && $scope.idcard) {
            user.checkprofile($scope.user, $scope.ssn,$scope.name,$scope.idcard)
                .then(function(data) {
                    console.log("ahahahahaha"+data);
/*
                    user.logout($scope).then(function() {
                        $scope.success = '绑定成功，请重新登录';
                        $scope.user = null;
                        $window.location = '/';

                    }, function(error) {
                        console.log(error);
                    });
        */           

                },function(error) {

                    $scope.error1 = error;
                }) ;
        } else {
            $scope.error1 = "社保号码、姓名、身份证号不能为空";
        }
    }

});

