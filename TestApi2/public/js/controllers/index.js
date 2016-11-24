/**
 * Created by Odin on 24.11.2016.
 */
'use strict';

angular
    .module('app')
    .controller('indexController', indexController);

indexController.$inject = ['$scope', '$user'];

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


