const Koa = require('koa');
const app = new Koa();
var http = require('http').Server(app);
var sokiet = require('./service/sokiet');
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.send('<h1>Welcome Realtime Server</h1>');
});


io.on('connection', function(socket){
	sokiet.onConnect(socket, io)
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
app.use(function (request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
