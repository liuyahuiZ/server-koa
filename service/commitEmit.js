var events=require('events');

const eventEmit = new events.EventEmitter();

exports.commitEmit=function (req) {
    console.log("事件触发", req);
    eventEmit.emit('commit_Add',req);
}

exports.commitHerdEmit=function (io) {
    eventEmit.on("commit_Add", function(parames){
		console.log("事件触发，调用此回调函数", parames);
		io.emit('commit', parames);
	})
}