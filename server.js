var app = require(__dirname + '/app'),
	port = 8888

var count = 0;
app.listen(port, function () {
	console.log('Listening on port ', port)
});

