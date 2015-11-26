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
    });
