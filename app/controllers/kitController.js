module.exports = function ($scope, kitService) {
    $scope.runs;
    $scope.lastRun;
    $scope.tests;

    kitService.getRuns()
        .then(function(data){
            $scope.runs=data.data.sort();
            console.log($scope.runs)
            $scope.lastRun=$scope.runs[$scope.runs.length-1];
        })
        //.then(function () {
        //   return kitService.getTests($scope.lastRun)
        //})
        //.then(function (data) {
        //    $scope.tests = data.data
        //    $scope.tests.forEach(function(test){
        //        test.type = (test.hasPassed) ? 'pass': 'fail'
        //    })
        //})
}
