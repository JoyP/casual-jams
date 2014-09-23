(function(){
  'use strict';

  angular.module('casual-jams')
  .controller('ProfileCtrl', ['$scope', '$location', 'User', function($scope, $location, User){
    $scope.user = {};

    $scope.toggleUpdate = function(){
      $scope.update = !!!$scope.update;
    };
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

