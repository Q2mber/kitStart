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
