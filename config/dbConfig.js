let dbName = "nodeapi";
let dbHost = "mongodb://localhost/";
let mongoose = require("mongoose");
exports.connect = function(request, response) {
    mongoose.connect(dbHost + dbName, { useMongoClient: true, server: {
      auto_reconnect: true,
      poolSize: 30
    } }); // useMongoClient防止报错
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
      console.log('connet success!');
    });
}