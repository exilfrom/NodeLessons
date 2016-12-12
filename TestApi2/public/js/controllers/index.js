/**
 * Created by Odin on 24.11.2016.
 */
'use strict';

angular
    .module('app')
    .controller('indexController', indexController)
    .controller('userListController', userListController)
    .controller('userDetailsController', userDetailsController);

indexController.$inject = ['$scope', '$user'];
userDetailsController.$inject = ['$scope', '$user','$routeParams'];
userListController.$inject = ['$scope', '$user'];

function indexController ($scope, $user) {
    $scope.users = [];
    $scope.currentUser = null;

    $scope.getUserList = function () {
        $user.getList()
            .success(function (users) {
                $scope.users = users;
            });
    }

    $scope.showUser = function(id){
        $user.getById(id)
            .success(function(user){
                $scope.currentUser = user;
            });
    }

    $scope.back = function(){
        $scope.currentUser = null;
    }
}

function userListController($scope, $user){
    $scope.users = [];

    /*$scope.getUserList = function () {
        $user.getList()
            .success(function (users) {
                $scope.users = users;
            });
    }*/

    function getUserList() {
        $user.getList()
            .success(function (users) {
                $scope.users = users;
            });
    }
    getUserList();
}

function userDetailsController($scope, $user, $routeParams){
    $scope.currentUser = null;
    var id = $routeParams["userId"];
    function init (){
        $user.getById(id)
            .success(function(user){
                $scope.currentUser = user;
            });
    }
    init();
}