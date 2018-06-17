const router = require('koa-router')();
import {getAccessToken, sign, createMenu, senAllMessage, senTemplateMessage, getUserList, getWebAccessToken} from '../app/controller/wx'

router.get('/', function (ctx, next) {
  ctx.body = 'this a users response!';
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

router.get('/getUserList', async (ctx, next) => {
  console.log(ctx.query);
  ctx.body = await getUserList(ctx.query);
})

router.post('/getWebAccessToken', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await getWebAccessToken(reqBody);
})

module.exports = router;
