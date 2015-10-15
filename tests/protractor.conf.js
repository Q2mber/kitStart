exports.config = {
    seleniumAddress:'http://127.0.0.1:4444/wd/hub',

    allScriptsTimeout:20000,

    specs:[
        'e2e/*.js'
    ],
    capabilities:{
        'browserName':'chrome'
    },
    chromeOnly:true,
    baseUrl:'http://localhost:8888/',
    framework:'jasmine',
    jasmineNodeOpts:{
        defaultTimeInterval:3000
    }
};