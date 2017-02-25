var express       = require('express'),
    app           = express(),
    server        = require('http').createServer(app),
    bodyParser    = require('body-parser');

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/app'));
//send the main page
app.get('/saa', function(req, res) {
    res.sendfile(__dirname + '/common/views/saa.html');
});

server.listen(8080, function(){
	console.log('Listening at port 8080...');
});