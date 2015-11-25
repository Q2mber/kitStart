(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//require("../bower_components/angular/angular");
require("./modules/d3");
require("./modules/directives");
require("./modules/controllers");
require("./modules/services");

angular.module('kitStart',['d3','kit.directives','kit.controllers','kit.services','ngRoute','ui.bootstrap'])
    .config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: "kitController",
            templateUrl: "html/page1.html"
        })
        .when('/link1', {
            controller: 'kitController',
            templateUrl: 'html/page1.html'
        })
        .otherwise({
            redirectTo: '/',
            controller: 'kitController'
        });
});

},{"./modules/controllers":4,"./modules/d3":5,"./modules/directives":6,"./modules/services":7}],2:[function(require,module,exports){
module.exports = function ($scope, kitService) {
    $scope.runs;
    $scope.lastRun;
    $scope.tests;

    kitService.getRuns()
        .then(function(data){
            $scope.runs=data;
            console.log($scope.runs)
            $scope.lastRun=data.data[2];
            console.log($scope.lastRun)
        })
        .then(function () {
           return kitService.getTests($scope.lastRun)
        })
        .then(function (data) {
            $scope.tests = data.data
            $scope.tests.forEach(function(test){
                test.type = (test.hasPassed) ? 'pass': 'fail'
            })
        })
}

},{}],3:[function(require,module,exports){
module.exports =
  function () {
    return {
      scope: true,
      restrict: 'A',

      link: function (scope, element, attrs) {
        scope.test = "KitStart";
      }
    }
  }
;

},{}],4:[function(require,module,exports){
angular.module('kit.controllers',[])
    .controller('kitController', require('../controllers/kitController'));

},{"../controllers/kitController":2}],5:[function(require,module,exports){
angular.module('d3', []).factory('d3Factory',
        function($document, $rootScope, $window, $q){
            // Ваш код

            var d = $q.defer();

            var scriptTag = $document[0].createElement('script');
            scriptTag.async = true;
            scriptTag.type = 'text/javascript';
            scriptTag.src = '"../../../../d3/d3.js';

            scriptTag.onload = function () {
                $rootScope.$apply(function(){d.resolve($window.d3)});
            };

            var b = $document[0].getElementsByTagName('body')[0];

            b.appendChild(scriptTag);

            return {
                d3: function(){
                    return d.promise;
                }
            }
        });

},{}],6:[function(require,module,exports){
angular.module('kit.directives',[])
    .directive('kitDirective', require('../directives/kitDirective'));

},{"../directives/kitDirective":3}],7:[function(require,module,exports){
angular.module('kit.services',[])
    .factory('kitService', require('../services/kitService'))

},{"../services/kitService":8}],8:[function(require,module,exports){
module.exports = function ($q, $http) {

    function getRuns(){
        return $http({
            method: 'GET',
            url: '/db/getRunsId'
        });
    }

    function getTests(runId){
        var data={
            run:runId
        };
        return $http({
            method: 'POST',
            url: '/db/getTests',
            data:data
        });
    }


    return {
        getRuns:getRuns,
        getTests: getTests,
    };
}

},{}]},{},[1]);
