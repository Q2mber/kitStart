module.exports = function ($q, $http) {

    function getRuns(){
        return $http({
            method: 'GET',
            url: '/db/getRunsId'
        });
    }

    function getTests(runId){
        var data={
            run:runId
        };
        return $http({
            method: 'POST',
            url: '/db/getTests',
            data:data
        });
    }


    return {
        getRuns:getRuns,
        getTests: getTests,
    };
}
