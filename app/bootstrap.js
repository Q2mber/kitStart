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
            templateUrl: "html/link1.html"
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
