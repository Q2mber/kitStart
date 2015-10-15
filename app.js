var express = require('express'),
    ejsLocals = require('ejs-locals'),
    app = express();
var sql = require(__dirname + '/server/sqldb')

// configuration settings
app.engine('ejs', ejsLocals)
app.set('views', __dirname + '/app/views')
app.set('view engine', 'jade')
app.use(express.static(__dirname + '/public'))


app.get('/', function (req, res) {
    res.render('index', {
        pageTitle: 'KitStart'
    })
});

app.get('/sql-get', function (req, res) {
    sql.get(res);
})
app.get('/sql-put/:page/:category/:user/:password', function (req, res) {
    sql.put(res, req.params.page, req.params.category, req.params.user, req.params.password);
})

app.get('/sql-rename/:old/:ne_w', function (req, res) {
    sql.rename(res, req.params.old, req.params.ne_w);
})
app.get('/sql-delete/:page', function (req, res) {
    sql.del(res, req.params.page);
})
app.get('/sql-put/:page/:category/:user/:password', function (req, res) {
    sql.put(res, req.params.page, req.params.category, req.params.user, req.params.password);
})


module.exports = app
