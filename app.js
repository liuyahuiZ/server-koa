const Koa = require('koa');
const app = new Koa();

const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const loggers = require('./middleware/loggers')

const router = require('./routes/allRoute');
const db = require('./config/dbConfig');

app.use(convert.compose(
  bodyparser,
  json(),
  logger()
))
// middlewares
app.use(convert(require('koa-static')(__dirname + '/public')));
// 本地log
app.use(convert(loggers()));
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


module.exports = app;