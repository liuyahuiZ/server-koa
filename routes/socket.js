const router = require('koa-router')();
import { logList, addLog, removeLog, logCount } from '../app/controller/accessLog'

router.get('/', function (ctx, next) {
  ctx.body = 'this a article response!';
});

router.post('/logCount', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await logCount(reqBody);
});

router.post('/logList', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await logList(reqBody);
});

router.post('/addLog', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await addLog(reqBody);
});

router.post('/removeLog', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await removeLog(reqBody);
});

module.exports = router;