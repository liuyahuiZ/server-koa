const Koa = require('koa');
const app = new Koa();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
	//在线用户
	var onlineUsers = {};
	//当前在线人数
	var onlineCount = 0;
	var candysUser = {};
	console.log('a user connected');
	// 监听事件some_event

	// console.log('socket', socket)
	//监听新用户加入
	socket.on('login', function(obj){
		//将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
		socket.name = obj.userid;

		//检查在线列表，如果不在里面就加入
		if(!onlineUsers.hasOwnProperty(obj.userid)) {
			onlineUsers[obj.userid] = obj.username;
			//在线人数+1
			onlineCount++;
		}

		//向所有客户端广播用户加入
		io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
		console.log(obj.username+'加入了聊天室');
	});

	//监听用户退出
	socket.on('disconnect', function(){
		//将退出的用户从在线列表中删除
		if(onlineUsers.hasOwnProperty(socket.name)) {
			//退出用户的信息
			var obj = {userid:socket.name, username:onlineUsers[socket.name]};

			//删除
			delete onlineUsers[socket.name];
			//在线人数-1
			onlineCount--;

			//向所有客户端广播用户退出
			io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
			console.log(obj.username+'退出了聊天室');
		}
	});

	//监听用户发布聊天内容
	socket.on('message', function(obj){
		//向所有客户端广播发布的消息
		io.emit('message', obj);
		console.log(obj.username+'说：'+obj.content);
	});

	socket.on('candysLogin', function(obj){
		console.log('candysUser', obj, candysUser)
		if(!candysUser.hasOwnProperty(obj.userid)){
			console.log('no this id', obj.userid);
			candysUser[obj.userid] = obj.username;
		}
	})
	
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
app.use(function (request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
