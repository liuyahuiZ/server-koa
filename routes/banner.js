const router = require('koa-router')();
import { findType, findTheType,  addType, removeType, typeList, updateType } from '../app/controller/banner'

router.get('/', function (ctx, next) {
  ctx.body = 'this a article response!';
});

router.post('/bannerList', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await typeList(reqBody);
});

router.post('/findBanner', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await findType(reqBody);
});

router.post('/findTheBanner', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await findTheType(reqBody);
});

router.post('/addBanner', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await addType(reqBody);
});
router.post('/updateBanner', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await updateType(reqBody);
});
router.post('/removeBanner', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await removeType(reqBody);
});

module.exports = router;