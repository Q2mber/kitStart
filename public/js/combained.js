(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//require("../bower_components/angular/angular");
require("./modules/d3");
require("./modules/directives");
require("./modules/controllers");
require("./modules/services");

angular.module('kitStart', ['d3', 'kit.directives', 'kit.controllers', 'kit.services', 'ui.router', 'ct.ui.router.extras', 'ui.bootstrap'])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {

        $stateProvider
            .state('index', {
                url:"",
                controller: "kitController",
                templateUrl: "/html/page1.html"
            })
            .state('run', {
                url: '/run/:id?',
                templateUrl: '/html/testList.html',
                controller: 'testListController'
            })
            .state('addRun', {
                url: '/add',
                templateUrl: '/html/addRun.html',
                controller: 'addRunController'
            })
    });

},{"./modules/controllers":6,"./modules/d3":7,"./modules/directives":8,"./modules/services":9}],2:[function(require,module,exports){
module.exports = function ($scope, kitService, $state, $stateParams) {
    $scope.commandBase = 'node_modules/.bin/intern-runner config=tests/intern \\';
    $scope.command;

    $scope.run=function(command){
        kitService.runTests(command)
    }

    $scope.suites = kitService.functionalSuites.map(function (suite) {
        return {
            name:suite.substring('functests/suites/'.length,suite.length),
            path:suite
        }
    });
    console.log($scope.suites)

    $scope.checkedSuites=[];

    $scope.changeCheckedSuites = function (suite) {
        var index = $scope.checkedSuites.indexOf(suite)
        if(index<0){
            $scope.checkedSuites.push(suite)
        }else{
            $scope.checkedSuites.splice(index,1)
        }
        console.log($scope.checkedSuites)
    }

    $scope.$watchCollection('checkedSuites', function(newValue, oldValue) {
        $scope.command = $scope.commandBase;
        $scope.checkedSuites.forEach(function(suite){
            $scope.command+='functionalSuites='+suite.path+' \\'
        })
    });
}

},{}],3:[function(require,module,exports){
module.exports = function ($scope, $q, kitService) {
    $scope.runs;


    kitService.getRuns()
        .then(function (data) {
            return data.data.sort().reverse();
        })
        .then(function (runsId) {
            return $q.all(runsId.map(function (run) {
                return kitService.getTests(run)
            }))
        })
        .then(function (all) {
            return all.map(function (run) {
                var count = 0,
                    failed = 0,
                    passed = 0;
                run.data.forEach(function (test) {
                    if (test.hasPassed) {
                        passed++;
                        test.type = 'pass';
                        test.class = 'success'
                    } else {
                        failed++;
                        test.type = 'fail';
                        test.class = 'danger'
                    }

                    test.test = formatTestText(test.test)
                })

                return {
                    date: run.data[0].run,
                    tests: run.data,
                    results: {
                        count: run.data.length,
                        failed: failed,
                        passed: passed
                    }

                }
            })

        })
        .then(function (data) {
            $scope.runs = data
        })

    formatTestText = function (test) {
        var startIndex = test.indexOf('this.remote') + 'this.remote'.length + 1
        var endIndex = test.length - 1
        return test.substring(startIndex, endIndex)
    }
}

},{}],4:[function(require,module,exports){
module.exports = function ($scope, kitService, $state, $stateParams) {
    $scope.runs;
    $scope.lastRun;
    $scope.tests = $scope.runs[$stateParams.id].tests
        .map(function (test) {
            if(typeof test.test == 'string')
                test.test= test.test.split(' .')
            return test
    });
    //console.log(tests)
    $scope.isErrorStep = function (step,test) {
        if(!!!test.hasPassed && test.error.indexOf(step.substring(0,step.indexOf('(')))>-1 && step.replace(/\s/g, '').length>0){
            return 'alert alert-warning'
        }
       else
            return true
    }

    $scope.myStyle = {
        width: '35%'
    }
    $scope.runResult = {
        all: 0,
        passed: 0,
        failed: 0
    }
}

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
angular.module('kit.controllers',[])
    .controller('kitController', require('../controllers/kitController'))
    .controller('testListController', require('../controllers/testListController'))
    .controller('addRunController', require('../controllers/addRunController'));

},{"../controllers/addRunController":2,"../controllers/kitController":3,"../controllers/testListController":4}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
angular.module('kit.directives',[])
    .directive('kitDirective', require('../directives/kitDirective'));

},{"../directives/kitDirective":5}],9:[function(require,module,exports){
angular.module('kit.services',[])
    .factory('kitService', require('../services/kitService'))

},{"../services/kitService":10}],10:[function(require,module,exports){
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

    function runTests(command){
        var data=command;
        return $http({
            method: 'POST',
            url: '/execute/intern',
            data:{
               command:command
            }
        });
    }

    functionalSuites= [
        'functests/suites/medlanes/addQuestionSuite',
        'functests/suites/medlanes/paypalSuite',
        'functests/suites/medlanes/stripeSuite',
        'functests/suites/medlanes/pageTimeLoadSuite',
        'functests/suites/medlanes/pageRedirectSuite',
        'functests/suites/medlanes/apiChecksSuite',
        'functests/suites/medlanes/couponsSuite',
        'functests/suites/medlanes/signupMailSuite',

        'functests/suites/medmedo/addQuestionSuite',
        'functests/suites/medmedo/paypalSuite',
        'functests/suites/medmedo/stripeSuite',
        'functests/suites/medmedo/pageTimeLoadSuite',
        'functests/suites/medmedo/pageRedirectSuite',
        'functests/suites/medmedo/apiChecksSuite',
        'functests/suites/medmedo/couponSuite',
        'functests/suites/medmedo/signupMailSuite',

        'functests/suites/mobileWebApp/addQuestionSuite',
        'functests/suites/mobileWebApp/paymentSuite',
        'functests/suites/mobileWebApp/signupMailSuite',

        'functests/suites/askadoctor/addQuestionSuite',
        'functests/suites/askadoctor/paypalSuite',
        'functests/suites/askadoctor/stripeSuite',
        'functests/suites/askadoctor/apiChecksSuite',
        'functests/suites/askadoctor/pageTimeLoadSuite',
        'functests/suites/askadoctor/pageRedirectSuite',
        'functests/suites/askadoctor/signupMailSuite',

        'functests/suites/askadoctor/userpanel/loginSuite',
        'functests/suites/askadoctor/userpanel/newQuestionSuite',
        'functests/suites/askadoctor/userpanel/paypalSuite',
        'functests/suites/askadoctor/userpanel/stripleSuite',
        'functests/suites/askadoctor/userpanel/apiChecksSuite',
        'functests/suites/askadoctor/userpanel/pageLoadTimeSuite',

        'functests/suites/askadoctor/doctorpanel/loginSuite',
        'functests/suites/askadoctor/doctorpanel/pageLoadTimeSuite',

        'functests/suites/askadoctor/doctor-user/replyQuestion',

        'functests/suites/stageMedlanes/loginSuite',

        'functests/suites/userpanel/loginSuite',
        'functests/suites/userpanel/newQuestionSuite',
        'functests/suites/userpanel/pageTimeLoadSuite',
        'functests/suites/userpanel/pageRedirectSuite',

        //'functests/suites/debug'
    ]


    return {
        getRuns:getRuns,
        getTests: getTests,
        runTests:runTests,
        functionalSuites:functionalSuites
    };
}

},{}]},{},[1]);
