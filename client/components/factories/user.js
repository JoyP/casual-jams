(function(){
  'use strict';

  angular.module('casual-jams')
  .factory('User', ['$http', function($http){

    function register(user){
      return $http.post('/register', user);
    }

    function login(user){
      return $http.post('/login', user);
    }

    function logout(){
      return $http.delete('/logout');
    }

    function update(user){
      console.log('user in update function, user factory>>>>>>>>', user);
      return $http.post('/profile', user);
    }

    function findById(){
      return $http.get('/profile');
    }

    return {register:register, login:login, logout:logout, update:update, findById:findById};
  }]);
})();

