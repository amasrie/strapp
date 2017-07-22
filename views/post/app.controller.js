(function () {
    'use strict';

    angular.module('app')
    	.controller('AppCtrl', [ '$scope', '$window', '$filter', '$rootScope', '$location', 'appService', AppCtrl])

    function AppCtrl($scope, $window, $filter, $rootScope, $location, appService) {

        $rootScope.$on("$stateChangeSuccess", function (event, currentRoute, previousRoute) {
          if($location.path() != '/post/list'){
            $location.path('/post/list');
          }
        });


        //variables de detalle
        $scope.post_id;
        $scope.post_title;
        $scope.post_body;

        //función que actualiza la iamgen en el detalle
        $scope.getImg = function(){
            if(!$scope.post_id){
                return "images/no_img.png";
            } else{
                return $scope.post[$scope.post_id -1].image;
            }
        }

        //variables para tabla
        var init;

        $scope.post = [];
        $scope.titles = [];
        $scope.searchKeywords = '';
        $scope.filteredStores = [];
        $scope.row = '';
        $scope.select = select;
        $scope.onFilterChange = onFilterChange;
        $scope.search = search;
        $scope.numPerPage = 5;
        $scope.currentPage = 1;

        //llamada al servicio que obtiene los datos
        appService.find('posts').then(function(response){
            $scope.post = response.data;
            $scope.post.forEach(
                function(item){
                    $scope.titles.push(item.title);
                }
            );
            appService.find('photos').then(function(response){
                console.log(response);
                for(var i = 0; i < $scope.post.length; i++){
                    $scope.post[i].image = response.data[i].thumbnailUrl;
                    $scope.post[i].hover = {'background-color': ''};
                }
                init();
            })
        });

        //resalta el elementos señalado
        $scope.hoverEffect = function(id, bool){
            $scope.post[id].hover = bool ? {'background-color': '#bdbdbd'} : {'background-color': ''};
        }

        //actualiza los elementos del detalle y sube scroll
        $scope.updateDetail = function(elem){
            $scope.post_id = elem.id;
            $scope.post_title = elem.title;
            $scope.post_body = elem.body;
            $scope.getImg();
            $window.scrollTo(0, 0);
        }

        function select(page) {
            var end, start;
            start = (page - 1) * $scope.numPerPage;
            end = start + $scope.numPerPage;
            return $scope.currentPageStores = $scope.filteredStores.slice(start, end);
        };

        function onFilterChange() {
            $scope.select(1);
            $scope.currentPage = 1;
            return $scope.row = '';
        };

        function search() {
            $scope.filteredStores = [];
            var filtering = $filter('filter')($scope.titles, $scope.searchKeywords);
            filtering.forEach(function(item){
                for(var i = 0; i < $scope.post.length; i++){
                    if($scope.post[i].title == item && notFiltered($scope.post[i].id)){
                        $scope.filteredStores.push($scope.post[i]);
                    }
                }
            })
            return $scope.onFilterChange();
        };

        function notFiltered(id){
            for(var i = 0; i < $scope.filteredStores.length; i++){
                if($scope.filteredStores[i].id == id){
                    return false;
                }
            }
            return true;
        }

        init = function() {
            $scope.search();
            return $scope.select($scope.currentPage);
        };

        init();

    }

})();
