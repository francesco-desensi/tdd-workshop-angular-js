(function () {
  'use strict';

  angular
    .module('tddWorkshop.data')
    .factory('users', users);

  users.$inject = ['$q', '$http', 'dataConstants'];
  function users($q, $http, dataConstants) {
    var service = {};

    service.getCurrentUser = getCurrentUser;
    service.setCurrentUser = setCurrentUser;
    service.login = login;
    service.getUser = getUser;

    var currentUser = null;
    var usersUri = [dataConstants.BASE_URL, dataConstants.USERS].join('/');

    return service;

    ////////////////

    function getUser(link) {
      return $http.get(link)
        .then(resolveWithData);
    }

    function resolveWithData(response) {
      return $q.when(response.data);
    }

    function getCurrentUser() {
      return currentUser;
    }

    function setCurrentUser(user) {
      currentUser = user;
    }

    function login(username) {
      return $http.get(usersUri, {params: {username: username}})
        .then(resolveWithData)
        .then(setAndReturnCurrentUser);
    }


    function setAndReturnCurrentUser(user) {
      service.setCurrentUser(user);
      return user;
    }
  }
})();

