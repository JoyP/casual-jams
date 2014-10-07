(function(){
  'use strict';

  angular.module('casual-jams')
  .controller('ProfileCtrl', ['$scope', '$location', 'User', function($scope, $location, User){
    $scope.user = {};

    User.findById().then(function(response){
      $scope.user = response.data.user;
    });

    $scope.toggleUpdate = function(){
      $scope.showForm = !!!$scope.showForm;
    };

    $scope.update = function(){
      User.update($scope.user).then(success, failure);
      console.log('success in profile controller>>>>>>>', success);
      console.log('failure in profile controller>>>>>>>', failure);
      $scope.showForm = false;
    };

    function success(response){
      toastr.success('User successfully registered.');
      $location.path('/login');
    }

    function failure(response){
      toastr.error('Error during user registration, try again.');
      $scope.user = {};
    }

  }]);
})();

