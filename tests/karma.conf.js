module.exports = function(config){
    config.set({
        basePath: '../app',
        frameworks : ['jasmine','browserify'],
        files:[
            {pattern:"tests/karma.conf.js", watched: false, included:false },
            '../public/js/vendor.js',
            'bootstrap.js',
            '../tests/unit/**/*.js',
            {pattern:"controllers/*.js", watched: true, included:false },
            {pattern:"directives/*.js", watched: true, included:false },
            {pattern:"modules/*.js", watched: true, included:false },
            {pattern:"services/*.js", watched: true, included:false },
        ],
        preprocessors:{
            'bootstrap.js':['browserify']
        },
        browserify:{
            debug:true
        },
        autoWatch: true,

        browsers:['Chrome'],

        plugins: [
        "karma-browserify",
        "karma-chrome-launcher",
        "karma-jasmine"
        ]
    })
}