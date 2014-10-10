(function(){
  'use strict';

  angular.module('casual-jams')
  .controller('SessionsCtrl', ['$scope', '$location', 'Session', function($scope, $location, Session){
    $scope.session      = {};
    $scope.newSession   = {};
    $scope.findSessions = [];
    $scope.mySessions   = [];
    $scope.find         = true;

    Session.findAll().then(function(response){
      $scope.findSessions = response.data.sessions;
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
      Session.create($scope.newSession).then(function(response){
        $scope.findSessions.push(response.data.session);
        $scope.mySessions.push(response.data.session);
      });
      $scope.newSession = {};
      $scope.showMySessions();
    };

    $scope.showSession = function(session){
      $scope.show = true;
      $scope.session = session;
      Session.findUsers(session).then(function(response){
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

