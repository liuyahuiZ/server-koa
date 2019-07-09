let dbName = "jfintech-sdk-node";
let user = 'jfintech-sdk-node';
let pass = 'NvIdA2_4dF'
let ip = '178.78.1.21';
let port = '28107';
let dbHost = `mongodb://${user}:${pass}@${ip}:${port}/`;
// let dbHost = 'mongodb://192.168.1.139:27017/';
let mongoose = require("mongoose");
exports.connect = function(request, response) {
    mongoose.connect(dbHost + dbName, { useMongoClient: true }); // useMongoClient防止报错
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
      console.log('connet success!');
    });
}