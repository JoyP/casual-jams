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

    function findSessionUsers(hostId, members){
      return $http.post('/showSession', {hostId:hostId, members:members});
    }

    function findMySessions(){
      return $http.get('/mySessions');
    }

    function join(jamSession){
      return $http.post('/joinSession', {jamSession:jamSession});
    }

    return {create:create, findAll:findAll, findSessionUsers:findSessionUsers, findMySessions:findMySessions, join:join};
  }]);
})();

