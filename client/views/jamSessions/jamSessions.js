(function(){
  'use strict';

  angular.module('casual-jams')
  .controller('JamSessionsCtrl', ['$scope', '$location', '$localForage', 'JamSession', function($scope, $location, $localForage, JamSession){
    $scope.jamSession   = {};
    $scope.newSession   = {};
    $scope.findSessions = [];
    $scope.mySessions   = [];
    $scope.find         = true;
    $scope.activeUser   = false;

    $localForage.getItem('email').then(function(email){
      $scope.email = email;
    });

    JamSession.findAll().then(function(response){
      $scope.findSessions = response.data.jamSessions;
    });

    $scope.showNew = function(){
      $scope.new  = true;
      $scope.find = false;
      $scope.my   = false;
      $scope.show = false;
      $scope.userInfo = false;
    };

    $scope.showFind = function(){
      $scope.find = true;
      $scope.new  = false;
      $scope.my   = false;
      $scope.show = false;
      $scope.userInfo = false;
    };

    $scope.showMySessions = function(){
      $scope.my   = true;
      $scope.new  = false;
      $scope.find = false;
      $scope.show = false;
      $scope.userInfo = false;

      JamSession.findMySessions().then(function(response){
        $scope.hostedSessions = response.data.hosted;
        $scope.joinedSessions = response.data.joined;
      });
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
      $scope.userInfo = false;
      $scope.jamSession = jamSession;
      JamSession.findSessionUsers($scope.jamSession.hostId, $scope.jamSession.members).then(function(response){
        $scope.host = response.data.user;
        $scope.members = response.data.members;
        console.log('activeUser in showSession>>>>', $scope.activeUser);
        console.log('host.email in showSession>>>>', $scope.host.email);
        console.log('email in showSession>>>>', $scope.email);
        $scope.activeUser = ($scope.host.email===$scope.email) ? true : false;
      });
    };

    $scope.showUser = function(user){
      $scope.userInfo = true;
      $scope.memberInfo = user;
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

