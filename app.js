var express = require('express'),
    ejsLocals = require('ejs-locals'),
    app = express();


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


module.exports = app
