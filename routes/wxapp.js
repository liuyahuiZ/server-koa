const router = require('koa-router')();
import {getAccessToken, getWebAccessToken, getUserOpenID} from '../app/controller/wxapp'

router.get('/', function (ctx, next) {
  ctx.body = 'this a users response!';
});
router.get('/getToken', async (ctx, next) => {
  ctx.body = await getAccessToken(ctx, next);
});

router.post('/getOpenID', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await getUserOpenID(reqBody);
})

module.exports = router;
