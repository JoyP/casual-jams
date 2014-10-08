(function(){
  'use strict';

  angular.module('casual-jams')
  .controller('SessionsCtrl', ['$scope', '$location', 'Sessions', function($scope, $location, Sessions){
    $scope.session = {};
    $scope.mySessions = true;

    $scope.toggleNew = function(){
      $scope.newSession = true;
      $scope.findSession = false;
      $scope.mySessions = false;
    };

    $scope.toggleFind = function(){
      $scope.findSession = true;
      $scope.newSession = false;
      $scope.mySessions = false;
    };

    $scope.toggleMySessions = function(){
      $scope.mySessions = true;
      $scope.newSession = false;
      $scope.findSession = false;
    };

//    $scope.addNew() = function(){
//      Session.create($scope.session);
//    };

//    function success(response){
//      toastr.success('New session created!');
//      $location.path('/sessions');
//    }

//    function failure(response){
//      toastr.error('Error during session creation, please try again.');
//      $scope.user = {};
//    }

  }]);
})();

