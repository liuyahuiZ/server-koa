const router = require('koa-router')();
import {getAccessToken} from '../app/controller/wx'

router.get('/', function (ctx, next) {
  ctx.body = 'this a users response!';
});
router.get('/getToken', async (ctx, next) => {
  ctx.body = await getAccessToken(ctx, next);
});
module.exports = router;
