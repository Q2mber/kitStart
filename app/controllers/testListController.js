module.exports = function ($scope, kitService, $state, $stateParams) {
    $scope.runs;
    $scope.lastRun;
    $scope.tests;

    $scope.myStyle={
        width:'35%'
    }
    $scope.runResult = {
        all: 0,
        passed: 0,
        failed: 0
    }

    kitService.getRuns()
        .then(function (data) {
            $scope.runs = data.data.sort();
            console.log($scope.runs)
            console.log($stateParams.id)
            console.log($scope.runs[$stateParams.id])
            $scope.lastRun = $scope.runs[$stateParams.id];
        })
        .then(function () {
            return kitService.getTests($scope.lastRun)
        })
        .then(function (data) {
            console.log(data.data)
            $scope.tests = data.data
            $scope.runResult.count = $scope.tests.length;
            $scope.tests.forEach(function (test) {

                if (test.hasPassed) {
                    $scope.runResult.passed++;
                    test.type = 'pass';
                    test.class ='success'
                }else{
                    $scope.runResult.failed++;
                    test.type = 'fail';
                    test.class ='danger'
                }

                test.test = formatTestText(test.test)
            })

        })

    formatTestText = function (test) {
        var startIndex = test.indexOf('this.remote') + 'this.remote'.length + 1
        var endIndex = test.length - 1
        return test.substring(startIndex, endIndex)
    }

}
