(function(){
  'use strict';

  angular.module('casual-jams')
  .controller('SessionsCtrl', ['$scope', '$location', 'Session', function($scope, $location, Session){
    $scope.session = {};
    $scope.newSession = {};
    $scope.findSessions = [];
    $scope.mySessions = [];
    $scope.my = true;

    $scope.showNew = function(){
      $scope.new = true;
      $scope.find = false;
      $scope.my = false;
    };

    $scope.showFind = function(){
      $scope.find= true;
      $scope.new= false;
      $scope.my= false;
    };

    $scope.showMySessions = function(){
      $scope.my= true;
      $scope.new= false;
      $scope.find= false;
    };

    $scope.addNew = function(){
      console.log('$scope.newSession in views controller>>>>>', $scope.newSession);
      Session.create($scope.newSession).then(success, failure);
      $scope.newSession = {};
      $scope.showMySessions();
    };

    function success(response){
      toastr.success('New session created!');
      $location.path('/sessions');
    }

    function failure(response){
      toastr.error('Error during session creation, please try again.');
      $scope.session = {};
    }

  }]);
})();

