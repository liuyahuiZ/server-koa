const router = require('koa-router')();
import { findType, addType, removeType } from '../app/controller/commonType'

router.get('/', function (ctx, next) {
  ctx.body = 'this a article response!';
});

router.post('/findType', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await findType(reqBody);
});

router.post('/addType', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await addType(reqBody);
});
router.post('/removeType', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await removeType(reqBody);
});

module.exports = router;