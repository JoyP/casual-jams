(function(){
  'use strict';

  angular.module('casual-jams')
  .controller('SessionsCtrl', ['$scope', '$location', 'Sessions', function($scope, $location, Sessions){
    $scope.session = {};

    $scope.toggleNew = function(){
      console.log('$scope.newSession in session controller', $scope.newSession);
      $scope.newSession = !!!$scope.newSession;
    };

//    $scope.addNew() = function(){
//      Session.create($scope.session);
//    };

//    function success(response){
//      toastr.success('User successfully registered.');
//      $location.path('/login');
//    }

//    function failure(response){
//      toastr.error('Error during user registration, try again.');
//      $scope.user = {};
//    }

  }]);
})();

