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

    function runTests(command){
        var data=command;
        return $http({
            method: 'POST',
            url: '/execute/intern',
            data:{
               command:command
            }
        });
    }

    functionalSuites= [
        'functests/suites/medlanes/addQuestionSuite',
        'functests/suites/medlanes/paypalSuite',
        'functests/suites/medlanes/stripeSuite',
        'functests/suites/medlanes/pageTimeLoadSuite',
        'functests/suites/medlanes/pageRedirectSuite',
        'functests/suites/medlanes/apiChecksSuite',
        'functests/suites/medlanes/couponsSuite',
        'functests/suites/medlanes/signupMailSuite',

        'functests/suites/medmedo/addQuestionSuite',
        'functests/suites/medmedo/paypalSuite',
        'functests/suites/medmedo/stripeSuite',
        'functests/suites/medmedo/pageTimeLoadSuite',
        'functests/suites/medmedo/pageRedirectSuite',
        'functests/suites/medmedo/apiChecksSuite',
        'functests/suites/medmedo/couponSuite',
        'functests/suites/medmedo/signupMailSuite',

        'functests/suites/mobileWebApp/addQuestionSuite',
        'functests/suites/mobileWebApp/paymentSuite',
        'functests/suites/mobileWebApp/signupMailSuite',

        'functests/suites/askadoctor/addQuestionSuite',
        'functests/suites/askadoctor/paypalSuite',
        'functests/suites/askadoctor/stripeSuite',
        'functests/suites/askadoctor/apiChecksSuite',
        'functests/suites/askadoctor/pageTimeLoadSuite',
        'functests/suites/askadoctor/pageRedirectSuite',
        'functests/suites/askadoctor/signupMailSuite',

        'functests/suites/askadoctor/userpanel/loginSuite',
        'functests/suites/askadoctor/userpanel/newQuestionSuite',
        'functests/suites/askadoctor/userpanel/paypalSuite',
        'functests/suites/askadoctor/userpanel/stripleSuite',
        'functests/suites/askadoctor/userpanel/apiChecksSuite',
        'functests/suites/askadoctor/userpanel/pageLoadTimeSuite',

        'functests/suites/askadoctor/doctorpanel/loginSuite',
        'functests/suites/askadoctor/doctorpanel/pageLoadTimeSuite',

        'functests/suites/askadoctor/doctor-user/replyQuestion',

        'functests/suites/stageMedlanes/loginSuite',

        'functests/suites/userpanel/loginSuite',
        'functests/suites/userpanel/newQuestionSuite',
        'functests/suites/userpanel/pageTimeLoadSuite',
        'functests/suites/userpanel/pageRedirectSuite',

        //'functests/suites/debug'
    ]


    return {
        getRuns:getRuns,
        getTests: getTests,
        runTests:runTests,
        functionalSuites:functionalSuites
    };
}
