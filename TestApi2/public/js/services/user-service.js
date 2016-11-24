/**
 * Created by Odin on 24.11.2016.
 */
'use strict';

angular
    .module('app')
    .factory('$user', user);

user.$inject = ['$http'];

function user($http) {
    var service = {};

    service.getList = function () {
        return $http.get('/api/users/');
    }

    service.getById = function (id) {
        return $http.get('/api/users/' + id);
    }

    return service;
}