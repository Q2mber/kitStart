var express = require('express'),
    ejsLocals = require('ejs-locals'),
    util = require('util'),
    exec = require('child_process').exec,
    app = express(),

    getTests = require(__dirname + '/server/mongodb').getTests,
    getRunsId = require(__dirname + '/server/mongodb').getRunsId

// configuration settings
app.engine('ejs', ejsLocals)
app.set('views', __dirname + '/app/views')
app.set('view engine', 'jade')
app.use(express.static(__dirname + '/public'))
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.render('index', {
        pageTitle: 'KitStart'
    })
});

app.get('/db/getRunsId', function (req, res) {
    getRunsId(req, res);
})
app.post('/db/getTests', function (req, res) {
    getTests(req.body, res) //req.body must be an object with "run" property, which contains datetime from getRunsId
})

app.post('/execute/intern',
    function (req, res) {
    exec(req.body.command,{ cwd: '../testing'},
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
})




module.exports = app
