const Koa = require('koa');
const app = new Koa();

const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const koaBody = require('koa-body');
const logger = require('koa-logger');
const cors = require('koa-cors');
const loggers = require('./middleware/loggers');
const test1 = require('./middleware/test1');
const test2 = require('./middleware/test2');

const router = require('./routes/allRoute');
const db = require('./config/dbConfig');

app.use(convert.compose(
  koaBody({ multipart: true }),
  bodyparser,
  json(),
  logger(),
  cors(),
))
// middlewares
app.use(convert(require('koa-static')(__dirname + '/public')));
// 本地log
app.use(convert(loggers()));
app.use(convert(test1()));
app.use(convert(test2()));
app.use(views(__dirname + '/views', {extension: 'jade'}));

// app.use(views(__dirname + '/views-ejs', {
//   extension: 'ejs'
// }));

// use route
app.use(router.routes(), router.allowedMethods());

// mongodb connect
db.connect();

app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
});

console.log("this is emacs insert");

module.exports = app;
