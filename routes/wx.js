const router = require('koa-router')();
import {getAccessToken, sign} from '../app/controller/wx'

router.get('/', function (ctx, next) {
  ctx.body = 'this a users response!';
});
router.get('/getToken', async (ctx, next) => {
  ctx.body = await getAccessToken(ctx, next);
});
router.get('/sign', async (ctx, next) => {
  ctx.body = await sign(ctx, next);
});
router.post('/sign', async (ctx, next) => {
  ctx.body = await sign(ctx, next);
});
module.exports = router;
