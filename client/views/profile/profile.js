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
      $scope.showForm = false;
    };

    function success(response){
      $scope.user = response.data.user;
      toastr.success('User successfully updated.');
      $location.path('/profile');
    }

    function failure(response){
      toastr.error('Error during update, please try again.');
      $location.path('/profile');
    }

  }]);
})();

