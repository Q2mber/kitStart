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
