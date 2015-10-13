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
