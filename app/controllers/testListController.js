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
