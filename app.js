var express = require('express'),
    ejsLocals = require('ejs-locals'),
    app = express();
var getTests = require(__dirname + '/server/mongodb').getTests
var getRunsId = require(__dirname + '/server/mongodb').getRunsId

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



module.exports = app
