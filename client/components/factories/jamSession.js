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
      console.log('hostId in session controller', hostId);
      console.log('members in session controller', members);
      return $http.post('/showSession', {hostId:hostId, members:members});
    }

    return {create:create, findAll:findAll, findSessionUsers:findSessionUsers};
  }]);
})();

