(function () {
    'use strict';

    angular.module('app', ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            var setRoutes = function(route) {
                var config, url;
                url = '/' + route;
                config = {
                    url: url,
                    templateUrl: route + '.html'
                };
                $stateProvider.state(route, config);
                return $stateProvider;
            };

            setRoutes('post/list');

            $urlRouterProvider
                .when('/', '/post/list')
                .otherwise('/post/list');
        }]
    );

})();
