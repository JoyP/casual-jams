(function(){
  'use strict';

  angular.module('casual-jams')
  .controller('JamSessionsCtrl', ['$scope', '$location', 'JamSession', function($scope, $location, JamSession){
    $scope.jamSession   = {};
    $scope.newSession   = {};
    $scope.findSessions = [];
    $scope.mySessions   = [];
    $scope.find         = true;

    JamSession.findAll().then(function(response){
      $scope.findSessions = response.data.jamSessions;
    });

    $scope.showNew = function(){
      $scope.new  = true;
      $scope.find = false;
      $scope.my   = false;
      $scope.show = false;
    };

    $scope.showFind = function(){
      $scope.find = true;
      $scope.new  = false;
      $scope.my   = false;
      $scope.show = false;
    };

    $scope.showMySessions = function(){
      $scope.my   = true;
      $scope.new  = false;
      $scope.find = false;
      $scope.show = false;
    };

    $scope.addNew = function(){
      JamSession.create($scope.newSession).then(function(response){
        $scope.findSessions.push(response.data.jamSession);
        $scope.mySessions.push(response.data.jamSession);
      });
      $scope.newSession = {};
      $scope.showMySessions();
    };

    $scope.showSession = function(jamSession){
      $scope.show = true;
      $scope.jamSession = jamSession;
      console.log('$scope.jamSession in $scope.showSession', $scope.jamSession);
      JamSession.findSessionUsers(jamSession).then(function(response){
        console.log('response.data in $scope.showSession>>>>>>>', response.data);
      });
    };

//    function success(response){
//      toastr.success('New session created!');
//      $location.path('/sessions');
//    }

//    function failure(response){
//      toastr.error('Error during session creation, please try again.');
//      $scope.session = {};
//    }

  }]);
})();

