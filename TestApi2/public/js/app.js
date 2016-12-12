/**
 * Created by Odin on 24.11.2016.
 */
var app = angular
    .module('app', ['ngRoute'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $routeProvider.
            when('/users', {
                templateUrl: '/templates/userList.html',
                controller: 'userListController'
            }).
            when('/users/:userId', {
                templateUrl: '/templates/userDetails.html',
                controller: 'userDetailsController'
            }).
            otherwise({redirectTo:'/users'});
    }]);