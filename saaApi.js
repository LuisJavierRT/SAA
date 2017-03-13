var express       = require('express'),
    app           = express(),
    server        = require('http').createServer(app),
    bodyParser    = require('body-parser'),
    sessionController     = require('./controllers/sessionController.js'),
    userController = require('./controllers/userController.js'),
    dependencyController = require('./controllers/dependencyController.js'),
    funcionarioController = require('./controllers/funcionarioController.js');


app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/app'));
//send the main page
app.get('/saa', function(req, res) {
    res.sendfile(__dirname + '/common/views/saa.html');
});

app.post('/login', sessionController.login);

app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.post('/users', userController.addUser);
app.put('/users/:id', userController.updateUser);
app.put('/changePassword/:id', userController.changePassword);

app.get('/dependencies', dependencyController.getAllDependencies);
app.get('/dependencies/:id', dependencyController.getDependencyById);
app.post('/dependencies', dependencyController.addDependency);
app.put('/dependencies/:id', dependencyController.updateDependency);

app.post('/funcionarios', funcionarioController.addFuncionario);
app.post('/funcionarios/academics', funcionarioController.addAcademics);
app.post('/funcionarios/records', funcionarioController.addRecords);

server.listen(8080, function(){
	console.log('Listening at port 8080...');
});