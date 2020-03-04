const router = require('koa-router')();
import { doAction } from '../app/controller/directAction';

router.get('/', async function (ctx, next) {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = resconf;
})

router.get('/login/test', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await doAction(reqBody);
});


module.exports = router;
