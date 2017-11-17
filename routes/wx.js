const router = require('koa-router')();
import {getAccessToken, sign} from '../app/controller/wx'

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
module.exports = router;
