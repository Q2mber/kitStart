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
