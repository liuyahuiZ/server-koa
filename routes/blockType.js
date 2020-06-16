const router = require('koa-router')();
import { findType, findTheType,  addType, removeType, typeList, updateType } from '../app/controller/blockType'

router.get('/', function (ctx, next) {
  ctx.body = 'this a article response!';
});

router.post('/typeList', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await typeList(reqBody);
});

router.post('/findType', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await findType(reqBody);
});

router.post('/findTheType', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await findTheType(reqBody);
});

router.post('/addType', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await addType(reqBody);
});
router.post('/updateType', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await updateType(reqBody);
});
router.post('/removeType', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await removeType(reqBody);
});

module.exports = router;