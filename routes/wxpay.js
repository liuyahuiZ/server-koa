const router = require('koa-router')();
import {pay, payCallback} from '../app/controller/wxpay'

router.get('/pay', async (ctx, next) => {
  // console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await pay(reqBody);
});

router.post('/callback', async (ctx, next) => {
    // console.log(ctx.request.body);
    let reqBody = ctx.request.body;
    ctx.body = await payCallback(reqBody);
});

module.exports = router;