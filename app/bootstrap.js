require("../bower_components/angular/angular");
require("./modules/d3");
require("./modules/directives");
require("./modules/controllers");
require("./modules/services");

angular.module('kitStart',['d3','kit.directives','kit.controllers','kit.services']);
