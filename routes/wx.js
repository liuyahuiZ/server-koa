const router = require('koa-router')();
import {getAccessToken, getEcho, sign, createMenu, senAllMessage, senTemplateMessage, sendTelMessage, getUserList, getWebAccessToken, sendCommonTplMessage} from '../app/controller/wx'
import { getUpLoadToken } from '../app/controller/qiniu';

router.get('/', function (ctx, next) {
  ctx.body = 'this a users response!';
});
router.get('/getEcho', async (ctx, next) => {
  console.log(ctx.query);
  let reqBody = ctx.query;
  ctx.body = await getEcho(reqBody);
});
router.get('/getToken', async (ctx, next) => {
  ctx.body = await getAccessToken(ctx, next);
});
router.get('/sign', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await sign(reqBody);
});
router.post('/sign', async (ctx, next) => {
  // console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await sign(reqBody);
});

router.get('/createMenu', async (ctx, next) => {
  ctx.body = await createMenu(ctx, next);
})

router.get('/senAllMessage', async (ctx, next) => {
  console.log(ctx.query);
  ctx.body = await senAllMessage(ctx.query);
})

router.get('/senTemplateMessage', async (ctx, next) => {
  console.log(ctx.query);
  ctx.body = await senTemplateMessage(ctx.query);
})

router.post('/sendTelMessage', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await sendTelMessage(reqBody);
})

router.get('/getUserList', async (ctx, next) => {
  console.log(ctx.query);
  ctx.body = await getUserList(ctx.query);
})

router.post('/getWebAccessToken', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await getWebAccessToken(reqBody);
})

router.get('/getUpToken', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await getUpLoadToken(reqBody);
})

router.post('/sendCommonTplMessage', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await sendCommonTplMessage(reqBody);
})

module.exports = router;
