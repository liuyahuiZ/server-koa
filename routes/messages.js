const router = require('koa-router')();
import { messagesList, addMessages, removeMessages, messagesCount } from '../app/controller/messages'

router.get('/', function (ctx, next) {
  ctx.body = 'this a article response!';
});

router.post('/messagesCount', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await messagesCount(reqBody);
});

router.post('/messagesList', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await messagesList(reqBody);
});

router.post('/addMessages', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await addMessages(reqBody);
});

router.post('/removeMessages', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await removeMessages(reqBody);
});

module.exports = router;