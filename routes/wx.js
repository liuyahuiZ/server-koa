const router = require('koa-router')();
import {getAccessToken, sign, createMenu, senAllMessage} from '../app/controller/wx'

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
  ctx.body = await senAllMessage(ctx, next);
})
module.exports = router;
