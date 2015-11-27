module.exports = function ($scope, $q, kitService) {
    $scope.runs;


    kitService.getRuns()
        .then(function (data) {
            return data.data.sort().reverse();
        })
        .then(function (runsId) {
            return $q.all(runsId.map(function (run) {
                return kitService.getTests(run)
            }))
        })
        .then(function (all) {
            return all.map(function (run) {
                var count = 0,
                    failed = 0,
                    passed = 0;
                run.data.forEach(function (test) {
                    if (test.hasPassed) {
                        passed++;
                        test.type = 'pass';
                        test.class = 'success'
                    } else {
                        failed++;
                        test.type = 'fail';
                        test.class = 'danger'
                    }

                    test.test = formatTestText(test.test)
                })

                return {
                    date: run.data[0].run,
                    tests: run.data,
                    results: {
                        count: run.data.length,
                        failed: failed,
                        passed: passed
                    }

                }
            })

        })
        .then(function (data) {
            $scope.runs = data
        })

    formatTestText = function (test) {
        var startIndex = test.indexOf('this.remote') + 'this.remote'.length + 1
        var endIndex = test.length - 1
        return test.substring(startIndex, endIndex)
    }
}
