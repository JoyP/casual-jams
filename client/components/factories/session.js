(function(){
  'use strict';

  angular.module('casual-jams')
  .factory('Session', ['$http', function($http){

    function create(sessionInfo){
      console.log('sessionInfo in session controller', sessionInfo);
      return $http.post('/newSession', sessionInfo);
    }

    return {create:create};
  }]);
})();

