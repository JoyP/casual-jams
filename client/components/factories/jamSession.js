(function(){
  'use strict';

  angular.module('casual-jams')
  .factory('JamSession', ['$http', function($http){

    function create(sessionInfo){
      console.log('sessionInfo in session controller', sessionInfo);
      return $http.post('/newSession', sessionInfo);
    }

    function findAll(){
      return $http.get('/findSessions');
    }

    function findSessionUsers(jamSession){
      console.log('jamSesion.hostId in session controller', jamSession.hostId);
      return $http.get('/showSession/' + jamSession._id);
    }

    return {create:create, findAll:findAll, findSessionUsers:findSessionUsers};
  }]);
})();

