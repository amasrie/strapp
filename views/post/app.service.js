(function () {
  'use strict';

  angular.module('app')
    .service('appService', function ($http) {

      return {
        //retorna los elementos del modelo solicitado
        find: function(elem){
          return $http({
            method: 'GET',
            url: 'http://jsonplaceholder.typicode.com/'+elem
          });
        }

      };

    });

})();
