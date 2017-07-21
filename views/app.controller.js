(function () {
    'use strict';

    angular.module('app')
    	.controller('AppCtrl', [ '$scope', '$rootScope', '$location', 'appService', AppCtrl])

    function AppCtrl($scope, $rootScope, $location, appService) {

        $rootScope.$on("$stateChangeSuccess", function (event, currentRoute, previousRoute) {
          if($location.path() != '/list' && $location.path() != '/details'){
            $location.path('/list');
          }
        });

    }

})();
